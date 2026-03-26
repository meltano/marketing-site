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

export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  init?: { revalidate?: number | false }
): Promise<T> {
  if (process.env.SKIP_WP_GRAPHQL === "1") {
    throw new Error("SKIP_WP_GRAPHQL is set");
  }
  const url = getEndpoint();
  if (!url) {
    throw new Error("Missing WPGRAPHQL_URL (or NEXT_PUBLIC_WPGRAPHQL_URL)");
  }
  const revalidate = init?.revalidate ?? 3600;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ query, variables }),
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
}

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
