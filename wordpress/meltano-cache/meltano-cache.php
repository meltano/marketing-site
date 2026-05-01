<?php
/**
 * Plugin Name:  Meltano Cache
 * Description:  Caches posts, podcasts, and case-study data in WP Transients and exposes
 *               fast REST endpoints consumed by the Next.js frontend via ISR.
 * Version:      1.0.0
 * Author:       Meltano
 * Requires PHP: 7.4
 */

defined( 'ABSPATH' ) || exit;

// ─── Constants ────────────────────────────────────────────────────────────────

define( 'MELTANO_CACHE_TTL',            86400 );          // 24 hours
define( 'MELTANO_CACHE_NS',             'custom/v1' );
define( 'MELTANO_CACHE_KEY_POSTS',      'meltano_cache_posts' );
define( 'MELTANO_CACHE_KEY_PODCASTS',   'meltano_cache_podcasts' );
define( 'MELTANO_CACHE_KEY_STUDIES',    'meltano_cache_case_studies' );
define( 'MELTANO_CACHE_CRON_HOOK',      'meltano_daily_cache_refresh' );
define( 'MELTANO_PODCAST_CPT',          'podcast_cpt' );
define( 'MELTANO_CASE_STUDY_CAT',       'case-study' );

// ─── Bootstrap ────────────────────────────────────────────────────────────────

add_action( 'rest_api_init',   'meltano_register_routes' );
add_action( 'save_post',       'meltano_invalidate_on_save', 10, 3 );
add_action( 'delete_post',     'meltano_invalidate_on_delete' );
add_action( 'trash_post',      'meltano_invalidate_on_delete' );
add_action( 'admin_menu',      'meltano_admin_menu' );
add_action( MELTANO_CACHE_CRON_HOOK, 'meltano_refresh_all_caches' );

register_activation_hook( __FILE__,   'meltano_activate' );
register_deactivation_hook( __FILE__, 'meltano_deactivate' );

function meltano_activate() {
    if ( ! wp_next_scheduled( MELTANO_CACHE_CRON_HOOK ) ) {
        // Schedule daily at 02:00 UTC; server-level cron should also hit the refresh endpoint.
        wp_schedule_event( strtotime( 'today 02:00' ), 'daily', MELTANO_CACHE_CRON_HOOK );
    }
    if ( ! get_option( 'meltano_cache_refresh_token' ) ) {
        update_option( 'meltano_cache_refresh_token', wp_generate_password( 32, false ) );
    }
}

function meltano_deactivate() {
    wp_clear_scheduled_hook( MELTANO_CACHE_CRON_HOOK );
}

// ─── REST Routes ──────────────────────────────────────────────────────────────

function meltano_register_routes() {
    $slug_pattern = '(?P<slug>[a-zA-Z0-9._~-]+)';

    register_rest_route( MELTANO_CACHE_NS, '/posts', [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_posts',
        'permission_callback' => '__return_true',
    ] );
    register_rest_route( MELTANO_CACHE_NS, '/posts/' . $slug_pattern, [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_post',
        'permission_callback' => '__return_true',
        'args'                => [ 'slug' => [ 'sanitize_callback' => 'sanitize_text_field' ] ],
    ] );

    register_rest_route( MELTANO_CACHE_NS, '/podcasts', [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_podcasts',
        'permission_callback' => '__return_true',
    ] );
    register_rest_route( MELTANO_CACHE_NS, '/podcasts/' . $slug_pattern, [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_podcast',
        'permission_callback' => '__return_true',
        'args'                => [ 'slug' => [ 'sanitize_callback' => 'sanitize_text_field' ] ],
    ] );

    register_rest_route( MELTANO_CACHE_NS, '/case-studies', [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_case_studies',
        'permission_callback' => '__return_true',
    ] );
    register_rest_route( MELTANO_CACHE_NS, '/case-studies/' . $slug_pattern, [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_case_study',
        'permission_callback' => '__return_true',
        'args'                => [ 'slug' => [ 'sanitize_callback' => 'sanitize_text_field' ] ],
    ] );

    // Cache management (CRON / admin use)
    register_rest_route( MELTANO_CACHE_NS, '/cache-refresh', [
        'methods'             => 'POST',
        'callback'            => 'meltano_endpoint_cache_refresh',
        'permission_callback' => 'meltano_verify_refresh_token',
    ] );
    register_rest_route( MELTANO_CACHE_NS, '/cache-status', [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_cache_status',
        'permission_callback' => 'meltano_verify_admin',
    ] );

    // Debug: list registered taxonomies for the podcast CPT (public, read-only)
    register_rest_route( MELTANO_CACHE_NS, '/debug/taxonomies', [
        'methods'             => 'GET',
        'callback'            => 'meltano_endpoint_debug_taxonomies',
        'permission_callback' => '__return_true',
    ] );
}

// ─── Endpoint Callbacks ───────────────────────────────────────────────────────

function meltano_endpoint_posts() {
    $data = meltano_get_cached_posts();
    return rest_ensure_response( [
        'posts' => [
            'nodes' => array_values( $data ),
        ],
    ] );
}

function meltano_endpoint_post( WP_REST_Request $req ) {
    $slug = $req->get_param( 'slug' );
    $all  = meltano_get_cached_posts();

    if ( isset( $all[ $slug ] ) ) {
        return rest_ensure_response( [ 'post' => $all[ $slug ] ] );
    }

    // Fallback: build on the fly for slugs not yet in cache (new publish)
    $post = get_page_by_path( $slug, OBJECT, 'post' );
    if ( ! $post || $post->post_status !== 'publish' ) {
        return new WP_Error( 'not_found', 'Post not found', [ 'status' => 404 ] );
    }
    $shaped = meltano_shape_post( $post );
    $all[ $slug ] = $shaped;
    set_transient( MELTANO_CACHE_KEY_POSTS, $all, MELTANO_CACHE_TTL );

    return rest_ensure_response( [ 'post' => $shaped ] );
}

function meltano_endpoint_podcasts() {
    $data = meltano_get_cached_podcasts();
    return rest_ensure_response( [
        'podcasts' => [
            'nodes' => array_values( $data ),
        ],
    ] );
}

function meltano_endpoint_podcast( WP_REST_Request $req ) {
    $slug = $req->get_param( 'slug' );
    $all  = meltano_get_cached_podcasts();

    if ( isset( $all[ $slug ] ) ) {
        return rest_ensure_response( [ 'podcast' => $all[ $slug ] ] );
    }

    $post = get_page_by_path( $slug, OBJECT, MELTANO_PODCAST_CPT );
    if ( ! $post ) {
        return new WP_Error( 'not_found', 'Podcast episode not found', [ 'status' => 404 ] );
    }
    $shaped = meltano_shape_podcast( $post );
    $all[ $slug ] = $shaped;
    set_transient( MELTANO_CACHE_KEY_PODCASTS, $all, MELTANO_CACHE_TTL );

    return rest_ensure_response( [ 'podcast' => $shaped ] );
}

function meltano_endpoint_case_studies() {
    $data = meltano_get_cached_case_studies();
    return rest_ensure_response( [
        'posts' => [
            'nodes' => array_values( $data ),
        ],
    ] );
}

function meltano_endpoint_case_study( WP_REST_Request $req ) {
    $slug = $req->get_param( 'slug' );
    $all  = meltano_get_cached_case_studies();

    if ( isset( $all[ $slug ] ) ) {
        return rest_ensure_response( [ 'post' => $all[ $slug ] ] );
    }

    $post = get_page_by_path( $slug, OBJECT, 'post' );
    if ( ! $post || $post->post_status !== 'publish' ) {
        return new WP_Error( 'not_found', 'Case study not found', [ 'status' => 404 ] );
    }
    $shaped = meltano_shape_post( $post );
    $all[ $slug ] = $shaped;
    set_transient( MELTANO_CACHE_KEY_STUDIES, $all, MELTANO_CACHE_TTL );

    return rest_ensure_response( [ 'post' => $shaped ] );
}

function meltano_endpoint_cache_refresh( WP_REST_Request $req ) {
    $type = sanitize_text_field( $req->get_param( 'type' ) ?? 'all' );

    if ( $type === 'posts' || $type === 'all' ) {
        meltano_build_posts_cache();
    }
    if ( $type === 'podcasts' || $type === 'all' ) {
        meltano_build_podcasts_cache();
    }
    if ( $type === 'case-studies' || $type === 'all' ) {
        meltano_build_case_studies_cache();
    }

    return rest_ensure_response( [
        'refreshed' => $type,
        'timestamp' => gmdate( 'c' ),
    ] );
}

function meltano_endpoint_cache_status() {
    return rest_ensure_response( [
        'posts'        => meltano_cache_info( MELTANO_CACHE_KEY_POSTS ),
        'podcasts'     => meltano_cache_info( MELTANO_CACHE_KEY_PODCASTS ),
        'case_studies' => meltano_cache_info( MELTANO_CACHE_KEY_STUDIES ),
    ] );
}

// ─── Cache Getters (lazy-build) ───────────────────────────────────────────────

function meltano_get_cached_posts(): array {
    $cached = get_transient( MELTANO_CACHE_KEY_POSTS );
    if ( is_array( $cached ) ) return $cached;
    return meltano_build_posts_cache();
}

function meltano_get_cached_podcasts(): array {
    $cached = get_transient( MELTANO_CACHE_KEY_PODCASTS );
    if ( is_array( $cached ) ) return $cached;
    return meltano_build_podcasts_cache();
}

function meltano_get_cached_case_studies(): array {
    $cached = get_transient( MELTANO_CACHE_KEY_STUDIES );
    if ( is_array( $cached ) ) return $cached;
    return meltano_build_case_studies_cache();
}

// ─── WPGraphQL Client ─────────────────────────────────────────────────────────
// Fetches data from WPGraphQL on the same server — guarantees field parity with
// what Next.js receives, so podcastLink / seasons / guests / hosts are never empty.

function meltano_graphql_query( string $query, array $variables = [] ): array {
    $url = apply_filters( 'meltano_graphql_url', get_site_url() . '/graphql' );

    $response = wp_remote_post( $url, [
        'headers' => [ 'Content-Type' => 'application/json' ],
        'body'    => wp_json_encode( [ 'query' => $query, 'variables' => $variables ] ),
        'timeout' => 30,
    ] );

    if ( is_wp_error( $response ) ) {
        meltano_log( 'WPGraphQL request failed: ' . $response->get_error_message() );
        return [];
    }

    $body = json_decode( wp_remote_retrieve_body( $response ), true );

    if ( ! empty( $body['errors'] ) ) {
        meltano_log( 'WPGraphQL errors: ' . wp_json_encode( array_column( $body['errors'], 'message' ) ) );
    }

    return $body['data'] ?? [];
}

// ─── Cache Builders ───────────────────────────────────────────────────────────

function meltano_build_posts_cache(): array {
    $nodes  = [];
    $cursor = null;

    $query = 'query($after: String) {
        posts(first: 100, after: $after, where: { status: PUBLISH }) {
            pageInfo { hasNextPage endCursor }
            nodes {
                id databaseId uri slug title excerpt
                content(format: RENDERED)
                date
                posts { shortDescription longDescription }
                categories { nodes { name uri } }
                author { node { name avatar { url } } }
                featuredImage { node { sourceUrl altText mediaDetails { width height } } }
            }
        }
    }';

    do {
        $data = meltano_graphql_query( $query, $cursor ? [ 'after' => $cursor ] : [] );
        $page = $data['posts'] ?? null;
        if ( ! $page ) break;
        foreach ( $page['nodes'] as $node ) {
            $nodes[ $node['slug'] ] = $node;
        }
        $cursor = ! empty( $page['pageInfo']['hasNextPage'] ) ? $page['pageInfo']['endCursor'] : null;
    } while ( $cursor );

    set_transient( MELTANO_CACHE_KEY_POSTS, $nodes, MELTANO_CACHE_TTL );
    meltano_log( 'posts cache built: ' . count( $nodes ) . ' items via WPGraphQL' );
    return $nodes;
}

function meltano_build_podcasts_cache(): array {
    $nodes  = [];
    $cursor = null;

    $query = 'query($after: String) {
        podcasts(first: 100, after: $after) {
            pageInfo { hasNextPage endCursor }
            nodes {
                id databaseId uri slug title date podcastId
                content(format: RENDERED)
                featuredImage { node { sourceUrl altText } }
                podcastLink {
                    applePodcasts { target title url }
                    podLink { target title url }
                    rssFeed { target title url }
                    spotifyPodcast { target title url }
                }
                seasons { nodes { id name link slug } }
                guests { nodes { id name slug podcastDetail { linkedinLink { url } catImage { sourceUrl } } } }
                hosts { nodes { id name slug podcastDetail { linkedinLink { url } catImage { sourceUrl } } } }
            }
        }
    }';

    do {
        $data = meltano_graphql_query( $query, $cursor ? [ 'after' => $cursor ] : [] );
        $page = $data['podcasts'] ?? null;
        if ( ! $page ) break;
        foreach ( $page['nodes'] as $node ) {
            $nodes[ $node['slug'] ] = $node;
        }
        $cursor = ! empty( $page['pageInfo']['hasNextPage'] ) ? $page['pageInfo']['endCursor'] : null;
    } while ( $cursor );

    set_transient( MELTANO_CACHE_KEY_PODCASTS, $nodes, MELTANO_CACHE_TTL );
    meltano_log( 'podcasts cache built: ' . count( $nodes ) . ' items via WPGraphQL' );
    return $nodes;
}

function meltano_build_case_studies_cache(): array {
    $query = 'query {
        posts(first: 200, where: { status: PUBLISH, categoryName: "case-study" }) {
            nodes {
                id databaseId uri slug title excerpt
                content(format: RENDERED)
                date
                categories { nodes { name uri } }
                author { node { name avatar { url } } }
                featuredImage { node { sourceUrl altText mediaDetails { width height } } }
            }
        }
    }';

    $data  = meltano_graphql_query( $query );
    $nodes = [];
    foreach ( $data['posts']['nodes'] ?? [] as $node ) {
        $nodes[ $node['slug'] ] = $node;
    }

    set_transient( MELTANO_CACHE_KEY_STUDIES, $nodes, MELTANO_CACHE_TTL );
    meltano_log( 'case-studies cache built: ' . count( $nodes ) . ' items via WPGraphQL' );
    return $nodes;
}

function meltano_refresh_all_caches() {
    meltano_build_posts_cache();
    meltano_build_podcasts_cache();
    meltano_build_case_studies_cache();
    update_option( 'meltano_cache_last_refresh', gmdate( 'c' ) );
}

function meltano_endpoint_debug_taxonomies() {
    // Verify WPGraphQL is reachable and responding
    $test = meltano_graphql_query( '{ __typename }' );
    return rest_ensure_response( [
        'graphql_url'       => apply_filters( 'meltano_graphql_url', get_site_url() . '/graphql' ),
        'graphql_reachable' => ! empty( $test ),
    ] );
}

function meltano_cache_info( string $key ): array {
    $data = get_transient( $key );
    if ( $data === false ) {
        return [ 'status' => 'empty', 'count' => 0 ];
    }
    return [ 'status' => 'warm', 'count' => count( $data ) ];
}

function meltano_log( string $message ) {
    if ( defined( 'WP_DEBUG_LOG' ) && WP_DEBUG_LOG ) {
        error_log( '[Meltano Cache] ' . $message );
    }
}

// ─── Cache Invalidation ───────────────────────────────────────────────────────

function meltano_invalidate_on_save( int $post_id, WP_Post $post, bool $update ) {
    if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) return;
    if ( $post->post_status !== 'publish' ) return;

    meltano_invalidate_by_type( $post->post_type, $post );
}

function meltano_invalidate_on_delete( int $post_id ) {
    $post = get_post( $post_id );
    if ( $post ) {
        meltano_invalidate_by_type( $post->post_type, $post );
    }
}

function meltano_invalidate_by_type( string $post_type, WP_Post $post ) {
    switch ( $post_type ) {
        case 'post':
            // Check if this is a case study to also clear that cache
            $cats = get_the_category( $post->ID );
            $cat_slugs = wp_list_pluck( $cats, 'slug' );

            delete_transient( MELTANO_CACHE_KEY_POSTS );
            meltano_log( "invalidated posts cache on save (post: {$post->post_name})" );

            if ( in_array( MELTANO_CASE_STUDY_CAT, $cat_slugs, true ) ) {
                delete_transient( MELTANO_CACHE_KEY_STUDIES );
                meltano_log( "invalidated case-studies cache on save (post: {$post->post_name})" );
            }
            break;

        case MELTANO_PODCAST_CPT:
            delete_transient( MELTANO_CACHE_KEY_PODCASTS );
            meltano_log( "invalidated podcasts cache on save (episode: {$post->post_name})" );
            break;
    }
}

// ─── Permissions ─────────────────────────────────────────────────────────────

function meltano_verify_refresh_token( WP_REST_Request $req ): bool {
    $token    = sanitize_text_field( $req->get_header( 'X-Cache-Refresh-Token' ) ?? '' );
    $expected = get_option( 'meltano_cache_refresh_token', '' );
    return $token && hash_equals( $expected, $token );
}

function meltano_verify_admin(): bool {
    return current_user_can( 'manage_options' );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function meltano_admin_menu() {
    add_management_page(
        'Meltano Cache',
        'Meltano Cache',
        'manage_options',
        'meltano-cache',
        'meltano_admin_page'
    );
}

function meltano_admin_page() {
    if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Unauthorized' );

    // Handle manual refresh
    if (
        isset( $_POST['meltano_action'] ) &&
        check_admin_referer( 'meltano_cache_action' )
    ) {
        $action = sanitize_text_field( $_POST['meltano_action'] );
        if ( $action === 'refresh_all' ) {
            meltano_refresh_all_caches();
            echo '<div class="notice notice-success"><p>All caches refreshed.</p></div>';
        } elseif ( $action === 'clear_all' ) {
            delete_transient( MELTANO_CACHE_KEY_POSTS );
            delete_transient( MELTANO_CACHE_KEY_PODCASTS );
            delete_transient( MELTANO_CACHE_KEY_STUDIES );
            echo '<div class="notice notice-warning"><p>All caches cleared. They will rebuild on next request.</p></div>';
        }
    }

    $posts_info   = meltano_cache_info( MELTANO_CACHE_KEY_POSTS );
    $podcast_info = meltano_cache_info( MELTANO_CACHE_KEY_PODCASTS );
    $studies_info = meltano_cache_info( MELTANO_CACHE_KEY_STUDIES );
    $last_refresh = get_option( 'meltano_cache_last_refresh', 'Never' );
    $token        = get_option( 'meltano_cache_refresh_token', '' );
    $site_url     = get_site_url();

    ?>
    <div class="wrap">
        <h1>Meltano Cache</h1>

        <h2>Cache Status</h2>
        <table class="widefat" style="max-width:500px">
            <thead><tr><th>Cache</th><th>Status</th><th>Items</th></tr></thead>
            <tbody>
                <tr>
                    <td>Posts</td>
                    <td><?= esc_html( $posts_info['status'] ) ?></td>
                    <td><?= esc_html( $posts_info['count'] ) ?></td>
                </tr>
                <tr>
                    <td>Podcasts</td>
                    <td><?= esc_html( $podcast_info['status'] ) ?></td>
                    <td><?= esc_html( $podcast_info['count'] ) ?></td>
                </tr>
                <tr>
                    <td>Case Studies</td>
                    <td><?= esc_html( $studies_info['status'] ) ?></td>
                    <td><?= esc_html( $studies_info['count'] ) ?></td>
                </tr>
            </tbody>
        </table>

        <p><strong>Last full refresh:</strong> <?= esc_html( $last_refresh ) ?></p>

        <h2>Actions</h2>
        <form method="post">
            <?php wp_nonce_field( 'meltano_cache_action' ); ?>
            <button name="meltano_action" value="refresh_all" class="button button-primary">
                Refresh All Caches Now
            </button>
            &nbsp;
            <button name="meltano_action" value="clear_all" class="button button-secondary"
                    onclick="return confirm('Clear all caches?')">
                Clear All Caches
            </button>
        </form>

        <h2>REST Endpoints</h2>
        <ul>
            <li><code><?= esc_html( $site_url ) ?>/wp-json/custom/v1/posts</code></li>
            <li><code><?= esc_html( $site_url ) ?>/wp-json/custom/v1/podcasts</code></li>
            <li><code><?= esc_html( $site_url ) ?>/wp-json/custom/v1/case-studies</code></li>
        </ul>

        <h2>CRON Cache Refresh</h2>
        <p>Next scheduled run: <strong><?= esc_html( wp_next_scheduled( MELTANO_CACHE_CRON_HOOK ) ? date( 'Y-m-d H:i:s T', wp_next_scheduled( MELTANO_CACHE_CRON_HOOK ) ) : 'Not scheduled' ) ?></strong></p>
        <p>Add a server-level cron to trigger a forced refresh daily (recommended over WP-Cron):</p>
        <pre style="background:#f0f0f0;padding:10px;display:inline-block">0 2 * * * curl -s -X POST \
  -H "X-Cache-Refresh-Token: <?= esc_html( $token ) ?>" \
  "<?= esc_html( $site_url ) ?>/wp-json/custom/v1/cache-refresh"</pre>

        <h2>Refresh Token</h2>
        <p>Use this token in the <code>X-Cache-Refresh-Token</code> header to call the refresh endpoint:</p>
        <code><?= esc_html( $token ) ?></code>
    </div>
    <?php
}
