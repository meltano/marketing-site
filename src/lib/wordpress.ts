/**
 * WPGraphQL client (same endpoint as gatsby-source-wordpress).
 * Set WPGRAPHQL_URL, WPUSERNAME, WPPASSWORD in .env.local (see .env.example).
 */

export type WpGraphqlResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

function getEndpoint(): string | null {
  return process.env.WPGRAPHQL_URL || process.env.NEXT_PUBLIC_WPGRAPHQL_URL || null;
}

/** True when a live WPGraphQL request should run (endpoint set and not skipped). */
export function isWpGraphqlFetchEnabled(): boolean {
  if (process.env.SKIP_WP_GRAPHQL === "1") return false;
  return Boolean(getEndpoint());
}

function authHeader(): Record<string, string> {
  const user = process.env.WPUSERNAME;
  const pass = process.env.WPPASSWORD;
  if (!user || !pass) return {};
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return { Authorization: `Basic ${token}` };
}

function wpFetchTimeoutMs(init?: { timeoutMs?: number }): number | null {
  if (init?.timeoutMs !== undefined) {
    return init.timeoutMs > 0 ? init.timeoutMs : null;
  }
  const fromEnv = process.env.WPGRAPHQL_FETCH_TIMEOUT_MS;
  if (fromEnv !== undefined && fromEnv !== "") {
    const n = Number(fromEnv);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return 30_000;
}

export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  init?: { revalidate?: number | false; timeoutMs?: number }
): Promise<T> {
  if (process.env.SKIP_WP_GRAPHQL === "1") {
    throw new Error("SKIP_WP_GRAPHQL is set");
  }
  const url = getEndpoint();
  if (!url) {
    throw new Error("Missing WPGRAPHQL_URL (or NEXT_PUBLIC_WPGRAPHQL_URL)");
  }
  const revalidate = init?.revalidate ?? 3600;
  const timeoutMs = wpFetchTimeoutMs(init);
  const controller = timeoutMs ? new AbortController() : null;
  const timeoutId =
    controller && timeoutMs
      ? setTimeout(() => controller.abort(), timeoutMs)
      : null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({ query, variables }),
      ...(controller ? { signal: controller.signal } : {}),
      ...(revalidate === false
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });
    if (!res.ok) {
      throw new Error(`WPGraphQL HTTP ${res.status}: ${await res.text()}`);
    }
    const json = (await res.json()) as WpGraphqlResponse<T>;
    if (json.errors?.length) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }
    if (!json.data) {
      throw new Error("WPGraphQL returned no data");
    }
    return json.data;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

// ---------------------------------------------------------------------------
// WP REST API helpers (used for custom post types like podcast_cpt)
// ---------------------------------------------------------------------------

function getWpRestBase(): string | null {
  if (process.env.WP_SITE_URL) return process.env.WP_SITE_URL.replace(/\/$/, "");
  const gqlUrl = process.env.WPGRAPHQL_URL || process.env.NEXT_PUBLIC_WPGRAPHQL_URL;
  if (!gqlUrl) return null;
  try {
    const u = new URL(gqlUrl);
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

export function isWpRestFetchEnabled(): boolean {
  if (process.env.SKIP_WP_GRAPHQL === "1") return false;
  return Boolean(getWpRestBase());
}

export async function wpRestFetch<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<{ data: T; totalPages: number }> {
  const base = getWpRestBase();
  if (!base) throw new Error("Missing WP_SITE_URL or WPGRAPHQL_URL to derive REST base");

  const url = new URL(`${base}/wp-json/wp/v2/${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json", ...authHeader() },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WP REST ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as T;
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
  return { data, totalPages };
}

// ---------------------------------------------------------------------------
// Custom cached REST API (served by the meltano-cache WP plugin)
// Endpoints: /wp-json/custom/v1/{posts|podcasts|case-studies}[/{slug}]
// ---------------------------------------------------------------------------

// Module-level in-process cache — survives across requests in the same Node.js
// process (SSR on Netlify keeps function instances warm between requests).
// This eliminates the HTTP round-trip after the first fetch.
const _memCache = new Map<string, { data: unknown; expiresAt: number }>();
const MEM_CACHE_TTL_MS = 86400 * 1000; // 24 hours, matches WP plugin TTL

export async function wpCachedFetch<T>(path: string): Promise<T> {
  const cacheKey = `custom/v1/${path}`;

  const hit = _memCache.get(cacheKey);
  if (hit && Date.now() < hit.expiresAt) {
    console.log(`[mem-cache] HIT: ${cacheKey}`);
    return hit.data as T;
  }

  const base = getWpRestBase();
  if (!base) throw new Error("Missing WP_SITE_URL or WPGRAPHQL_URL to derive REST base");

  const url = `${base}/wp-json/custom/v1/${path}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...authHeader() },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`WP Cached API ${res.status}: ${url}`);

  const data = (await res.json()) as T;
  _memCache.set(cacheKey, { data, expiresAt: Date.now() + MEM_CACHE_TTL_MS });
  console.log(`[mem-cache] SET: ${cacheKey}`);
  return data;
}

// ---------------------------------------------------------------------------

/** Map WP MediaItem to the Gatsby localFile + childImageSharp shape used by components. */
export function mapMediaToGatsby(node: {
  sourceUrl?: string | null;
  altText?: string | null;
  mediaItemUrl?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
} | null) {
  const url = node?.sourceUrl || node?.mediaItemUrl;
  if (!url) return null;
  const w = node?.mediaDetails?.width || 1200;
  const h = node?.mediaDetails?.height || 800;
  return {
    node: {
      altText: node?.altText,
      localFile: {
        publicURL: url,
      },
      childImageSharp: {
        gatsbyImageData: {
          width: w,
          height: h,
          images: { fallback: { src: url } },
          layout: "constrained",
        },
      },
    },
  };
}

export function mapFeaturedImageField(
  featured:
    | {
        node?: {
          sourceUrl?: string | null;
          altText?: string | null;
          mediaDetails?: { width?: number; height?: number } | null;
        } | null;
      }
    | null
    | undefined
) {
  if (!featured?.node) return null;
  return mapMediaToGatsby(featured.node);
}
