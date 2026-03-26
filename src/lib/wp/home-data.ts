import {
  isWpGraphqlFetchEnabled,
  mapFeaturedImageField,
  mapMediaToGatsby,
  wpFetch,
} from "@/lib/wordpress";
import { MOCK_HOME_DATA } from "@/lib/wp/mock-home";
import { HOME_PAGE } from "@/lib/wp/queries";

function mediaToLocalGatsbyImage(
  node: Parameters<typeof mapMediaToGatsby>[0] | null | undefined
) {
  if (!node) return null;
  const m = mapMediaToGatsby(node);
  if (!m?.node?.childImageSharp?.gatsbyImageData) return null;
  return {
    localFile: {
      childImageSharp: {
        gatsbyImageData: m.node.childImageSharp.gatsbyImageData,
      },
    },
  };
}

function normalizeStickyPost(node: Record<string, unknown>) {
  const n = node as {
    uri?: string;
    title?: string;
    id?: string;
    categories?: { nodes?: { name?: string; uri?: string }[] };
    author?: unknown;
    date?: string;
    excerpt?: string;
    featuredImage?: unknown;
  };
  return {
    ...n,
    link: n.uri || "",
    categories: n.categories
      ? {
          nodes: (n.categories.nodes || []).map((c) => ({
            ...c,
            link: c.uri || "",
          })),
        }
      : { nodes: [] },
    featuredImage: mapFeaturedImageField(
      n.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
    ),
  };
}

/** Map WP page node fields that used localFile.publicURL in Gatsby. */
function normalizeHomeNode(node: Record<string, unknown>) {
  const n = { ...node };
  n.featuredImage = mapFeaturedImageField(
    n.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
  );

  const eng = n.engineers as Record<string, unknown> | undefined;
  if (eng?.engineersTable) {
    const tables = Array.isArray(eng.engineersTable)
      ? eng.engineersTable
      : [eng.engineersTable];
    eng.engineersTable = tables.map((row: Record<string, unknown>) => {
      const img = row.engineersTableImage as { sourceUrl?: string } | undefined;
      if (img?.sourceUrl) {
        return {
          ...row,
          engineersTableImage: {
            localFile: { publicURL: img.sourceUrl },
          },
        };
      }
      return row;
    });
  }

  const ult = n.ultimate as { ultimateArray?: Record<string, unknown>[] } | undefined;
  if (ult?.ultimateArray) {
    ult.ultimateArray = ult.ultimateArray.map((item) => {
      const icon = item.ultimateIcon as { sourceUrl?: string } | undefined;
      if (icon?.sourceUrl) {
        return {
          ...item,
          ultimateIcon: {
            localFile: { publicURL: icon.sourceUrl },
          },
        };
      }
      return item;
    });
  }

  const comm = n.community as { communityArray?: Record<string, unknown>[] } | undefined;
  if (comm?.communityArray) {
    comm.communityArray = comm.communityArray.map((item) => {
      const ci = item.communityIcon as { sourceUrl?: string } | undefined;
      const cimg = item.communityImage as Parameters<typeof mapMediaToGatsby>[0];
      let next = { ...item };
      if (ci?.sourceUrl) {
        next = {
          ...next,
          communityIcon: { localFile: { publicURL: ci.sourceUrl } },
        };
      }
      const shaped = mediaToLocalGatsbyImage(cimg);
      if (shaped) {
        next = {
          ...next,
          communityImage: shaped,
        };
      }
      return next;
    });
  }

  const test = n.testimonials as { testimonialsArray?: Record<string, unknown>[] } | undefined;
  if (test?.testimonialsArray) {
    test.testimonialsArray = test.testimonialsArray.map((item) => {
      const ti = item.testimonialsImage as Parameters<typeof mapMediaToGatsby>[0];
      const shaped = mediaToLocalGatsbyImage(ti);
      if (shaped) {
        return {
          ...item,
          testimonialsImage: shaped,
        };
      }
      return item;
    });
  }

  return n;
}

async function loadHomeDataFromWp() {
  const raw = await wpFetch<{
    pages?: { nodes: Record<string, unknown>[] };
    stickyPosts?: { nodes: Record<string, unknown>[] };
  }>(HOME_PAGE, {});

  const pageNode = raw.pages?.nodes?.[0];
  if (!pageNode) {
    throw new Error('No WordPress page with title "Home" (or empty pages.nodes)');
  }

  return {
    home: {
      nodes: [normalizeHomeNode(pageNode)],
    },
    stickyPosts: {
      edges: (raw.stickyPosts?.nodes || []).map((node) => ({
        node: normalizeStickyPost(node),
      })),
    },
  };
}

/** Used by Pages Router `getStaticProps` / App Router (if reintroduced). */
export async function getHomeData() {
  if (!isWpGraphqlFetchEnabled()) {
    return MOCK_HOME_DATA;
  }
  return loadHomeDataFromWp();
}
