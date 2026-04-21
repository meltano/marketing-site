<?php
/**
 * Plugin Name: Matatika Connectors Cache
 * Description: Proxies the Matatika dataplugins API and caches results using WordPress transients.
 * Version:     1.0.0
 *
 * Credentials are baked in as defaults. Override any of them in wp-config.php
 * by defining the constant before this plugin loads.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// ── Credentials (override in wp-config.php if needed) ─────────────────────────
if ( ! defined( 'MATATIKA_AUTH0_TOKEN_URL' ) ) {
	define( 'MATATIKA_AUTH0_TOKEN_URL', 'https://matatika-staging.eu.auth0.com/oauth/token' );
}
if ( ! defined( 'MATATIKA_AUTH0_CLIENT_ID' ) ) {
	define( 'MATATIKA_AUTH0_CLIENT_ID', '73mD4vHTcjGjRnsz0oJxgtHKP4PriJP1' );
}
if ( ! defined( 'MATATIKA_AUTH0_CLIENT_SECRET' ) ) {
	define( 'MATATIKA_AUTH0_CLIENT_SECRET', '10l-M45ljhKU5yWM3pGUjSgyb3FGtJnVZihdqgVgzs3rOWb0kGDKqs_k62kH--XY' );
}
if ( ! defined( 'MATATIKA_AUTH0_AUDIENCE' ) ) {
	define( 'MATATIKA_AUTH0_AUDIENCE', 'https://staging.matatika.com/api' );
}
if ( ! defined( 'MATATIKA_API_URL' ) ) {
	define( 'MATATIKA_API_URL', 'https://staging.matatika.com/api' );
}
if ( ! defined( 'MATATIKA_APP_URL' ) ) {
	define( 'MATATIKA_APP_URL', 'https://staging.matatika.com' );
}

add_action( 'rest_api_init', 'matatika_register_connectors_route' );

function matatika_register_connectors_route() {
	register_rest_route(
		'matatika/v1',
		'/connectors',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'matatika_connectors_handler',
			'permission_callback' => '__return_true',
		)
	);
}

/**
 * REST handler — returns connectors from transient cache or fetches fresh data.
 *
 * @return WP_REST_Response|WP_Error
 */
function matatika_connectors_handler() {
	$cache_key = 'matatika_connectors_v1';
	$cached    = get_transient( $cache_key );

	if ( false !== $cached ) {
		return rest_ensure_response( $cached );
	}

	// ── Cache miss: fetch fresh data ──────────────────────────────────────────

	$access_token = matatika_get_access_token();
	if ( is_wp_error( $access_token ) ) {
		return $access_token;
	}

	$api_url  = trailingslashit( MATATIKA_API_URL ) . 'dataplugins?size=999&sort=label';
	$response = wp_remote_get(
		$api_url,
		array(
			'headers' => array(
				'Authorization' => 'Bearer ' . $access_token,
				'Accept'        => 'application/json',
			),
			'timeout' => 30,
		)
	);

	if ( is_wp_error( $response ) ) {
		return new WP_Error(
			'matatika_api_error',
			'Failed to reach Matatika API: ' . $response->get_error_message(),
			array( 'status' => 502 )
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	if ( $status_code !== 200 ) {
		return new WP_Error(
			'matatika_api_error',
			'Matatika API returned ' . $status_code,
			array( 'status' => 502 )
		);
	}

	$body = json_decode( wp_remote_retrieve_body( $response ), true );
	$plugins = isset( $body['_embedded']['dataplugins'] )
		? $body['_embedded']['dataplugins']
		: array();

	// Normalise logo URLs the same way the Next.js side did previously.
	$app_url    = untrailingslashit( MATATIKA_APP_URL );
	$connectors = array_map(
		function ( $plugin ) use ( $app_url ) {
			$logo = isset( $plugin['logoUrl'] ) ? $plugin['logoUrl'] : '';
			if ( $logo && stripos( $logo, 'http' ) !== 0 ) {
				$logo = $app_url . $logo;
			}
			$plugin['logoUrl'] = $logo;
			return $plugin;
		},
		$plugins
	);

	// Sort by label (falling back to name) — case-insensitive.
	usort(
		$connectors,
		function ( $a, $b ) {
			$label_a = isset( $a['label'] ) && $a['label'] ? $a['label'] : $a['name'];
			$label_b = isset( $b['label'] ) && $b['label'] ? $b['label'] : $b['name'];
			return strcasecmp( $label_a, $label_b );
		}
	);

	// Cache for 1 hour.
	set_transient( $cache_key, $connectors, HOUR_IN_SECONDS );

	return rest_ensure_response( $connectors );
}

/**
 * Fetches an Auth0 access token using client_credentials.
 *
 * @return string|WP_Error  Access token string or WP_Error on failure.
 */
function matatika_get_access_token() {
	$response = wp_remote_post(
		MATATIKA_AUTH0_TOKEN_URL,
		array(
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body'    => wp_json_encode(
				array(
					'client_id'     => MATATIKA_AUTH0_CLIENT_ID,
					'client_secret' => MATATIKA_AUTH0_CLIENT_SECRET,
					'audience'      => MATATIKA_AUTH0_AUDIENCE,
					'grant_type'    => 'client_credentials',
				)
			),
			'timeout' => 15,
		)
	);

	if ( is_wp_error( $response ) ) {
		return new WP_Error(
			'auth0_request_failed',
			'Auth0 token request failed: ' . $response->get_error_message(),
			array( 'status' => 502 )
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	if ( $status_code !== 200 ) {
		return new WP_Error(
			'auth0_request_failed',
			'Auth0 returned ' . $status_code,
			array( 'status' => 502 )
		);
	}

	$data = json_decode( wp_remote_retrieve_body( $response ), true );
	if ( empty( $data['access_token'] ) ) {
		return new WP_Error(
			'auth0_no_token',
			'Auth0 response did not include an access_token',
			array( 'status' => 502 )
		);
	}

	return $data['access_token'];
}
