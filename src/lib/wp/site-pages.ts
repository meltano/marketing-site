import { format, parseISO } from "date-fns";

import {
  isWpGraphqlFetchEnabled,
  mapFeaturedImageField,
  mapMediaToGatsby,
  wpCachedFetch,
  wpFetch,
} from "@/lib/wordpress";
import * as Q from "@/lib/wp/page-queries";
import { mediaToLocalChildSharp } from "@/lib/wp/wp-map";

// Module-level process cache — stores the in-flight Promise so all concurrent
// getStaticProps calls share a single fetch, preventing thundering-herd 504s/429s.
const _processCache: {
  posts: Promise<Record<string, unknown>[]> | null;
  podcasts: Promise<Record<string, unknown>[]> | null;
  caseStudies: Promise<Record<string, unknown>[]> | null;
} = {
  posts: null,
  podcasts: null,
  caseStudies: null,
};

function formatWpDate(iso: string | null | undefined, fmt: string): string {
  if (!iso) return "";
  try {
    return format(parseISO(iso.replace(" ", "T")), fmt);
  } catch {
    return "";
  }
}

function extFromUrl(url: string): string {
  const m = url.match(/(\.[a-zA-Z0-9]+)(\?|$)/);
  return m ? m[1].toLowerCase() : "";
}

function normalizePostNode(node: Record<string, unknown>) {
  const n = node as {
    id?: string;
    uri?: string;
    title?: string;
    excerpt?: string;
    date?: string;
    posts?: { shortDescription?: string, longDescription?: string };
    categories?: { nodes?: { name?: string; uri?: string }[] };
    author?: unknown;
    featuredImage?: unknown;
  };
  return {
    id: n.id,
    link: n.uri || "",
    title: n.title,
    excerpt: n.excerpt,
    shortDescription: n.posts?.shortDescription ?? null,
    longDescription: n.posts?.longDescription ?? null,
    date: formatWpDate(n.date, "dd MMM yyyy"),
    categories: n.categories
      ? {
        nodes: (n.categories.nodes || []).map((c) => ({
          ...c,
          link: c.uri || "",
        })),
      }
      : { nodes: [] },
    author: n.author,
    featuredImage: mapFeaturedImageField(
      n.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
    ),
  };
}

function normalizePostNodeLatestDate(node: Record<string, unknown>) {
  const base = normalizePostNode(node);
  return {
    ...base,
    date: formatWpDate((node as { date?: string }).date, "MMMM dd yyyy"),
  };
}

function stickyEdgesFromNodes(nodes: Record<string, unknown>[]) {
  return nodes.map((node) => ({ node: normalizePostNode(node) }));
}

function sortPostsByDateDesc(nodes: Record<string, unknown>[]) {
  return [...nodes].sort((a, b) => {
    const da = (a as { date?: string }).date || "";
    const db = (b as { date?: string }).date || "";
    return db.localeCompare(da);
  });
}

function pageNodeFeatured<T extends { featuredImage?: unknown }>(node: T) {
  return {
    ...node,
    featuredImage: mapFeaturedImageField(
      node.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
    ),
  };
}

function normalizeAboutNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw) as Record<string, unknown>;
  const aq = n.aboutQuote as Record<string, unknown> | undefined;
  if (aq?.aboutQuoteImage) {
    aq.aboutQuoteImage = mediaToLocalChildSharp(
      aq.aboutQuoteImage as Parameters<typeof mediaToLocalChildSharp>[0]
    );
  }
  const av = n.aboutValues as { aboutValuesList?: Record<string, unknown>[] } | undefined;
  if (av?.aboutValuesList) {
    av.aboutValuesList = av.aboutValuesList.map((item) => {
      const icon = item.aboutValuesItemIcon as { sourceUrl?: string } | undefined;
      return {
        ...item,
        aboutValuesItemIcon: icon?.sourceUrl
          ? { localFile: { publicURL: icon.sourceUrl } }
          : item.aboutValuesItemIcon,
      };
    });
  }
  const ac = n.aboutContributors as { aboutContributorsTeam?: Record<string, unknown>[] } | undefined;
  if (ac?.aboutContributorsTeam) {
    ac.aboutContributorsTeam = ac.aboutContributorsTeam.map((m) => {
      const img = m.aboutContributorsTeamMemberImage as Parameters<
        typeof mapMediaToGatsby
      >[0];
      const shaped = mediaToLocalChildSharp(img);
      return {
        ...m,
        aboutContributorsTeamMemberImage: shaped,
      };
    });
  }
  const ai = n.aboutInvestors as { aboutInvestorsList?: Record<string, unknown>[] } | undefined;
  if (ai?.aboutInvestorsList) {
    ai.aboutInvestorsList = ai.aboutInvestorsList.map((row) => {
      const img = row.aboutInvestorsListImage as Parameters<typeof mapMediaToGatsby>[0];
      return {
        ...row,
        aboutInvestorsListImage: mediaToLocalChildSharp(img),
      };
    });
  }
  return n;
}

function normalizeContactNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const cf = n.contactForm as { contactFormLinks?: Record<string, unknown>[] } | undefined;
  if (cf?.contactFormLinks) {
    cf.contactFormLinks = cf.contactFormLinks.map((row) => {
      const icon = row.contactFormLinksIcon as { sourceUrl?: string } | undefined;
      return {
        ...row,
        contactFormLinksIcon: icon?.sourceUrl
          ? { localFile: { publicURL: icon.sourceUrl } }
          : row.contactFormLinksIcon,
      };
    });
  }
  return n;
}

function normalizeCommunityNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const b = n.communityBuild as { communityBuildBoxes?: Record<string, unknown>[] } | undefined;
  if (b?.communityBuildBoxes) {
    b.communityBuildBoxes = b.communityBuildBoxes.map((row) => {
      const icon = row.communityBuildBoxesIcon as { sourceUrl?: string } | undefined;
      return {
        ...row,
        communityBuildBoxesIcon: icon?.sourceUrl
          ? { localFile: { publicURL: icon.sourceUrl } }
          : row.communityBuildBoxesIcon,
      };
    });
  }
  const ev = n.communityEvents as
    | { communityEventsIcon?: { sourceUrl?: string } | { localFile?: { publicURL?: string } } }
    | undefined;
  if (ev?.communityEventsIcon && "sourceUrl" in (ev.communityEventsIcon as object)) {
    const url = (ev.communityEventsIcon as { sourceUrl?: string }).sourceUrl;
    if (url) {
      (ev as { communityEventsIcon?: unknown }).communityEventsIcon = {
        localFile: { publicURL: url },
      };
    }
  }
  const g = n.communityGear as { communityGearType?: { communityGearTypeItems?: Record<string, unknown>[] }[] } | undefined;
  if (g?.communityGearType) {
    g.communityGearType = g.communityGearType.map((t) => {
      const items = t.communityGearTypeItems;
      if (!items) return t;
      return {
        ...t,
        communityGearTypeItems: items.map((row) => {
          const icon = row.communityGearTypeItemsIcon as { sourceUrl?: string } | undefined;
          return {
            ...row,
            communityGearTypeItemsIcon: icon?.sourceUrl
              ? { localFile: { publicURL: icon.sourceUrl } }
              : row.communityGearTypeItemsIcon,
          };
        }),
      };
    });
  }
  return n;
}

function normalizePricingTable(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const pt = n.pricingTable as { pricingTableItem?: Record<string, unknown>[] } | undefined;
  if (pt?.pricingTableItem) {
    pt.pricingTableItem = pt.pricingTableItem.map((row) => {
      const icon = row.pricingTableItemIcon as { sourceUrl?: string } | undefined;
      return {
        ...row,
        pricingTableItemIcon: icon?.sourceUrl
          ? { localFile: { publicURL: icon.sourceUrl } }
          : row.pricingTableItemIcon,
      };
    });
  }
  return n;
}

function normalizeProductNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const tabs = n.productTabs as { productTab?: Record<string, unknown>[] } | undefined;
  if (tabs?.productTab) {
    tabs.productTab = tabs.productTab.map((tab) => {
      const ben = tab.productTabBenefits as { productTabBenefitsItems?: Record<string, unknown>[] } | undefined;
      if (!ben?.productTabBenefitsItems) return tab;
      return {
        ...tab,
        productTabBenefits: {
          ...ben,
          productTabBenefitsItems: ben.productTabBenefitsItems.map((it) => {
            const img = it.productTabBenefitsItemImage as {
              sourceUrl?: string;
              mediaDetails?: { width?: number; height?: number };
            } | undefined;
            return {
              ...it,
              productTabBenefitsItemImage: img?.sourceUrl
                ? {
                  width: img.mediaDetails?.width || 1,
                  height: img.mediaDetails?.height || 1,
                  localFile: { publicURL: img.sourceUrl },
                }
                : it.productTabBenefitsItemImage,
            };
          }),
        },
      };
    });
  }
  return n;
}

function normalizePressNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const pt = n.pressTabs as { pressTabsTab?: Record<string, unknown>[] } | undefined;
  if (pt?.pressTabsTab) {
    pt.pressTabsTab = pt.pressTabsTab.map((tab) => {
      const logos = tab.pressTabsTabContentLogos as Record<string, unknown> | undefined;
      if (logos?.pressTabsTabContentLogosList) {
        const list = logos.pressTabsTabContentLogosList as Record<string, unknown>[];
        logos.pressTabsTabContentLogosList = list.map((item) => {
          const img = item.pressTabsTabContentLogosListImage as {
            mediaItemUrl?: string;
            sourceUrl?: string;
            mediaDetails?: { width?: number; height?: number };
          };
          const url = img?.mediaItemUrl || img?.sourceUrl || "";
          const w = img?.mediaDetails?.width || 1;
          const h = img?.mediaDetails?.height || 1;
          const links = item.pressTabsTabContentLogosListLinks as Record<string, unknown>[] | undefined;
          const mappedLinks =
            links?.map((link) => {
              const li = link.pressTabsTabContentLogosListLinksItem as {
                mediaItemUrl?: string;
                sourceUrl?: string;
              };
              const u = li?.mediaItemUrl || li?.sourceUrl || "";
              return {
                pressTabsTabContentLogosListLinksItem: u
                  ? {
                    localFile: {
                      publicURL: u,
                      ext: extFromUrl(u),
                    },
                  }
                  : null,
              };
            }) || [];
          return {
            ...item,
            pressTabsTabContentLogosListImage: {
              width: w,
              height: h,
              localFile: { publicURL: url },
            },
            pressTabsTabContentLogosListLinks: mappedLinks,
          };
        });
      }
      const contents = tab.pressTabsTabContent as Record<string, unknown>[] | undefined;
      if (contents) {
        tab.pressTabsTabContent = contents.map((c) => {
          const img = c.pressTabsTabContentImage as Parameters<typeof mapMediaToGatsby>[0];
          const shaped = mediaToLocalChildSharp(img);
          return {
            ...c,
            pressTabsTabContentImage: shaped,
          };
        });
      }
      return tab;
    });
  }
  return n;
}

function normalizePartnersNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const pm = n.partnersMeet as { partnersMeetGroup?: Record<string, unknown>[] } | undefined;
  if (pm?.partnersMeetGroup) {
    pm.partnersMeetGroup = pm.partnersMeetGroup.map((g) => {
      const img = g.partnersMeetGroupImage as Parameters<typeof mapMediaToGatsby>[0];
      return {
        ...g,
        partnersMeetGroupImage: mediaToLocalChildSharp(img),
      };
    });
  }
  return n;
}

function normalizeLegalNode(raw: Record<string, unknown>) {
  const n = pageNodeFeatured(raw);
  const c = n.content;
  if (typeof c === "string") return n;
  if (c && typeof c === "object" && "rendered" in (c as object)) {
    return { ...n, content: (c as { rendered?: string }).rendered || "" };
  }
  return { ...n, content: (c as string) || "" };
}

/** On WPGraphQL errors (504, timeout, etc.), return `mock` so static generation can finish. */
async function withWpFallback<T>(label: string, mock: T, fetchFn: () => Promise<T>): Promise<T> {
  if (!isWpGraphqlFetchEnabled()) return mock;
  try {
    return await fetchFn();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`WPGraphQL ${label} failed, using mock:`, msg);
    return mock;
  }
}

export async function getAboutData() {
  return withWpFallback("about page", MOCK_ABOUT, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.ABOUT_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "About"');
    return { about: { nodes: [normalizeAboutNode(node)] } };
  });
}

export async function getContactData() {
  return withWpFallback("contact page", MOCK_CONTACT, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.CONTACT_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Contact"');
    return { contact: { nodes: [normalizeContactNode(node)] } };
  });
}

export async function getCommunityData() {
  return withWpFallback("community page", MOCK_COMMUNITY, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.COMMUNITY_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Community"');
    return { community: { nodes: [normalizeCommunityNode(node)] } };
  });
}

export async function getPricingData() {
  return withWpFallback("pricing page", MOCK_PRICING, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.PRICING_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Pricing"');
    return { pricing: { nodes: [normalizePricingTable(node)] } };
  });
}

export async function getProductData() {
  return withWpFallback("product page", MOCK_PRODUCT, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
      latestPosts?: { nodes: Record<string, unknown>[] };
    }>(Q.PRODUCT_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Product"');
    const sorted = sortPostsByDateDesc(raw.latestPosts?.nodes || []);
    const stickyPosts = { edges: stickyEdgesFromNodes(sorted.slice(0, 3)) };
    return {
      product: { nodes: [normalizeProductNode(node)] },
      stickyPosts,
    };
  });
}

export async function getPressData() {
  return withWpFallback("press page", MOCK_PRESS, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.PRESS_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Press"');
    return { press: { nodes: [normalizePressNode(node)] } };
  });
}

export async function getPartnersData() {
  return withWpFallback("partners page", MOCK_PARTNERS, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.PARTNERS_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Partners"');
    return { partners: { nodes: [normalizePartnersNode(node)] } };
  });
}

export async function getPricingCalculatorData() {
  return withWpFallback("pricingcalculator page", MOCK_PRICING_CALC, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.PRICING_CALCULATOR_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) return MOCK_PRICING_CALC;
    return { pricingcalculator: { nodes: [node] } };
  });
}

export async function getTermsData() {
  return withWpFallback("terms page", MOCK_TERMS, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.TERMS_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Terms of service"');
    return { tos: { nodes: [normalizeLegalNode(node)] } };
  });
}

export async function getPrivacyData() {
  return withWpFallback("privacy page", MOCK_PRIVACY, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.PRIVACY_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Privacy policy"');
    return { privacy: { nodes: [normalizeLegalNode(node)] } };
  });
}

export async function getDpaData() {
  return withWpFallback("dpa page", MOCK_DPA, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.DPA_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Data Processing Addendum"');
    return { dpa: { nodes: [normalizeLegalNode(node)] } };
  });
}

export async function getThankYouData() {
  return withWpFallback("thank you page", MOCK_THANK_YOU, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.THANK_YOU_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "Thank you"');
    return { thankyou: { nodes: [pageNodeFeatured(node)] } };
  });
}

export async function getNotFoundData() {
  return withWpFallback("404 page", MOCK_NOT_FOUND, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
    }>(Q.NOT_FOUND_PAGE);
    const node = raw.pages?.nodes?.[0];
    if (!node) throw new Error('No WordPress page with title "404"');
    return { notfound: { nodes: [pageNodeFeatured(node)] } };
  });
}

type BlogPostsPageResult = {
  posts?: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: Record<string, unknown>[] };
};

async function _doFetchAllBlogPosts(): Promise<Record<string, unknown>[]> {
  try {
    const cached = await wpCachedFetch<{ posts?: { nodes: Record<string, unknown>[] } }>('posts');
    if (cached.posts?.nodes?.length) {
      console.log(`[cache] HIT: /custom/v1/posts (${cached.posts.nodes.length} posts)`);
      return cached.posts.nodes;
    }
  } catch (err) {
    console.warn('[cache] MISS: /custom/v1/posts —', err instanceof Error ? err.message : err);
  }

  const allNodes: Record<string, unknown>[] = [];
  let cursor: string | null = null;
  do {
    const page: BlogPostsPageResult = await wpFetch<BlogPostsPageResult>(
      Q.BLOG_POSTS_PAGE,
      cursor ? { after: cursor } : {}
    );
    const nodes = page.posts?.nodes || [];
    allNodes.push(...nodes);
    cursor = page.posts?.pageInfo.hasNextPage ? page.posts.pageInfo.endCursor : null;
  } while (cursor);
  return allNodes;
}

function fetchAllBlogPosts(): Promise<Record<string, unknown>[]> {
  if (!_processCache.posts) _processCache.posts = _doFetchAllBlogPosts();
  return _processCache.posts;
}

export async function getBlogData() {
  return withWpFallback("blog index", MOCK_BLOG, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
      categories?: { nodes: { name?: string }[] };
    }>(Q.BLOG_PAGE);
    const blogNode = raw.pages?.nodes?.[0];
    if (!blogNode) throw new Error('No WordPress page with title "Blog"');
    const normalizedBlog = { ...blogNode } as Record<string, unknown>;
    const fi = normalizedBlog.featuredBlogImage as Parameters<typeof mapFeaturedImageField>[0];
    normalizedBlog.featuredBlogImage = mapFeaturedImageField(fi);

    const allPostNodes = await fetchAllBlogPosts();
    const sortedPosts = sortPostsByDateDesc(allPostNodes);
    const latestNode = sortedPosts[0];
    const latestPost = {
      edges: latestNode
        ? [{ node: normalizePostNodeLatestDate(latestNode as Record<string, unknown>) }]
        : [],
    };
    const allPosts = sortedPosts.map((p) => normalizePostNode(p as Record<string, unknown>));
    const allWpPost = {
      edges: allPosts.map((post) => ({ post })),
    };
    const cats = (raw.categories?.nodes || [])
      .map((c) => c.name)
      .filter((n): n is string => Boolean(n && n !== "Uncategorized"));
    const allWpCategory = {
      nodes: [...new Set(cats)].map((name) => ({ name })),
    };

    return {
      blog: { nodes: [normalizedBlog] },
      latestPost,
      allWpPost,
      allWpCategory,
    };
  });
}

function normalizeBlogPostFull(raw: Record<string, unknown>) {
  const contentRaw = raw.content;
  const content =
    typeof contentRaw === "string"
      ? contentRaw
      : (contentRaw as { rendered?: string })?.rendered || "";
  const excerptRaw = raw.excerpt;
  const excerpt =
    typeof excerptRaw === "string"
      ? excerptRaw
      : (excerptRaw as { rendered?: string })?.rendered || "";
  const n = raw as {
    id?: string;
    uri?: string;
    title?: string;
    date?: string;
    posts?: { shortDescription?: string, longDescription?: string };
    categories?: { nodes?: { name?: string; uri?: string }[] };
    author?: unknown;
    featuredImage?: unknown;
  };
  return {
    id: n.id,
    link: n.uri || "",
    title: n.title ?? "",
    excerpt,
    content,
    shortDescription: n.posts?.shortDescription ?? null,
    longDescription: n.posts?.longDescription ?? null,
    date: formatWpDate(n.date, "MMMM dd yyyy"),
    categories: n.categories
      ? {
        nodes: (n.categories.nodes || []).map((c) => ({
          ...c,
          link: c.uri || "",
        })),
      }
      : { nodes: [] },
    author: n.author,
    featuredImage: mapFeaturedImageField(
      n.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
    ),
  };
}

function adjacentNavPosts(
  sorted: { slug?: string; uri?: string; title?: string }[],
  currentSlug: string
): {
  previous: { uri: string; title: string } | null;
  next: { uri: string; title: string } | null;
} {
  const idx = sorted.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { previous: null, next: null };
  const newer = idx > 0 ? sorted[idx - 1] : null;
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  return {
    previous: older
      ? { uri: older.uri || "", title: older.title || "" }
      : null,
    next: newer ? { uri: newer.uri || "", title: newer.title || "" } : null,
  };
}

export type BlogPostPageData = {
  post: ReturnType<typeof normalizeBlogPostFull>;
  previous: { uri: string; title: string } | null;
  next: { uri: string; title: string } | null;
};

const MOCK_BLOG_POST: BlogPostPageData = {
  post: normalizeBlogPostFull({
    id: "mock",
    uri: "/sample-post/",
    title: "Sample blog post",
    excerpt: "<p>Excerpt</p>",
    content:
      "<p>WordPress content loads here when <code>WPGRAPHQL_URL</code> is set.</p>",
    date: "2026-01-01T12:00:00",
    categories: { nodes: [{ name: "News", uri: "/category/news/" }] },
    author: { node: { name: "Author", avatar: { url: "/assets/img/ogimg.png" } } },
    featuredImage: null,
  }),
  previous: null,
  next: null,
};

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!isWpGraphqlFetchEnabled()) return [];
  try {
    const cached = await wpCachedFetch<{ posts?: { nodes: { slug?: string }[] } }>('posts');
    const slugs = (cached.posts?.nodes || []).map((n) => n.slug).filter((s): s is string => Boolean(s));
    if (slugs.length) return slugs;
  } catch {
    // fall through to WPGraphQL
  }
  try {
    type SlugsPageResult = {
      posts?: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: { slug?: string }[] };
    };
    const slugs: string[] = [];
    let cursor: string | null = null;
    do {
      const page: SlugsPageResult = await wpFetch<SlugsPageResult>(
        Q.BLOG_POST_SLUGS,
        cursor ? { after: cursor } : {}
      );
      for (const n of page.posts?.nodes || []) {
        if (n.slug) slugs.push(n.slug);
      }
      cursor = page.posts?.pageInfo.hasNextPage ? page.posts.pageInfo.endCursor : null;
    } while (cursor);
    return slugs;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("WPGraphQL blog post slugs failed, returning no paths:", msg);
    return [];
  }
}

export async function getBlogPostData(slug: string): Promise<BlogPostPageData | null> {
  const slugClean = decodeURIComponent(slug.replace(/^\/+|\/+$/g, "").split("/").pop() || slug);

  if (!isWpGraphqlFetchEnabled()) return MOCK_BLOG_POST;

  try {
    // Fetch all posts from batch cache (already in _memCache if getStaticPaths ran first).
    // Find the target post by slug — zero individual slug API calls.
    const allNodes = await fetchAllBlogPosts();
    const postNode = allNodes.find((n) => (n as { slug?: string }).slug === slugClean);

    if (postNode) {
      const post = normalizeBlogPostFull(postNode);
      const sorted = sortPostsByDateDesc(allNodes);
      const { previous, next } = adjacentNavPosts(
        sorted.map((p) => ({
          slug: (p as { slug?: string }).slug,
          uri: (p as { uri?: string }).uri,
          title: (p as { title?: string }).title,
        })),
        slugClean
      );
      return { post, previous, next };
    }
  } catch (err) {
    console.warn(`[cache] blog batch failed for "${slugClean}", falling back to WPGraphQL —`, err instanceof Error ? err.message : err);
  }

  // WPGraphQL fallback (e.g. new post not yet in plugin cache)
  try {
    const raw = await wpFetch<{
      post?: Record<string, unknown> | null;
      posts?: { nodes: Record<string, unknown>[] };
    }>(Q.BLOG_POST_PAGE, { slug: slugClean });

    if (!raw.post) return null;

    const post = normalizeBlogPostFull(raw.post);
    const sorted = sortPostsByDateDesc(raw.posts?.nodes || []);
    const currentSlug = (raw.post as { slug?: string }).slug || slugClean;
    const { previous, next } = adjacentNavPosts(
      sorted.map((p) => ({
        slug: (p as { slug?: string }).slug,
        uri: (p as { uri?: string }).uri,
        title: (p as { title?: string }).title,
      })),
      currentSlug
    );
    return { post, previous, next };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("WPGraphQL blog post query failed:", msg);
    throw err;
  }
}

async function _doFetchAllCaseStudies(): Promise<Record<string, unknown>[]> {
  try {
    const cached = await wpCachedFetch<{ posts?: { nodes: Record<string, unknown>[] } }>('case-studies');
    if (cached.posts?.nodes?.length) {
      console.log(`[cache] HIT: /custom/v1/case-studies (${cached.posts.nodes.length} posts)`);
      return cached.posts.nodes;
    }
  } catch (err) {
    console.warn('[cache] MISS: /custom/v1/case-studies —', err instanceof Error ? err.message : err);
  }

  try {
    const raw = await wpFetch<{ posts?: { nodes: Record<string, unknown>[] } }>(Q.CASE_STUDY_SLUGS);
    return raw.posts?.nodes ?? [];
  } catch (err) {
    console.error("[case-studies] query failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

function fetchAllCaseStudies(): Promise<Record<string, unknown>[]> {
  if (!_processCache.caseStudies) _processCache.caseStudies = _doFetchAllCaseStudies();
  return _processCache.caseStudies;
}

export async function getCaseStudiesData() {
  return withWpFallback("case studies index", MOCK_CASE_STUDIES, async () => {
    const [allPostNodes, raw] = await Promise.all([
      fetchAllCaseStudies(),
      wpFetch<{ pages?: { nodes: Record<string, unknown>[] } }>(Q.CASE_STUDIES_PAGE),
    ]);

    const pageNode = raw.pages?.nodes?.[0];
    if (!pageNode) throw new Error('No WordPress page with title "Case Study"');
    const normalizedPage = { ...pageNode } as Record<string, unknown>;
    const fi = normalizedPage.featuredCaseStudyImage as Parameters<typeof mapFeaturedImageField>[0];
    normalizedPage.featuredCaseStudyImage = mapFeaturedImageField(fi);

    const sortedPosts = sortPostsByDateDesc(allPostNodes);
    const allPosts = sortedPosts.map((p) => normalizePostNode(p as Record<string, unknown>));
    const allCaseStudies = {
      edges: allPosts.map((post) => ({ post })),
    };

    const latestNode = sortedPosts[0];
    const latestCaseStudy = {
      edges: latestNode
        ? [{ node: normalizePostNodeLatestDate(latestNode as Record<string, unknown>) }]
        : [],
    };
    const allCaseStudyCategory = {
      nodes: Array.from(
        new Set(
          allPosts
            .flatMap((post) => post.categories.nodes.map((cat) => cat.name))
            .filter((name): name is string => Boolean(name && name !== "Uncategorized"))
        )
      ).map((name) => ({ name })),
    };

    return {
      caseStudiesPage: { nodes: [normalizedPage] },
      latestCaseStudy,
      allCaseStudies,
      allCaseStudyCategory,
    };
  });
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!isWpGraphqlFetchEnabled()) return [];
  try {
    const nodes = await fetchAllCaseStudies();
    return nodes.map((n) => (n as { slug?: string }).slug).filter((s): s is string => Boolean(s));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("Case study slugs failed, returning no paths:", msg);
    return [];
  }
}

export async function getCaseStudyData(slug: string): Promise<BlogPostPageData | null> {
  const slugClean = decodeURIComponent(slug.replace(/^\/+|\/+$/g, "").split("/").pop() || slug);
  if (!isWpGraphqlFetchEnabled()) return MOCK_CASE_STUDY_POST;

  try {
    const allNodes = await fetchAllCaseStudies();
    const postNode = allNodes.find((n) => (n as { slug?: string }).slug === slugClean);

    if (postNode) {
      const post = normalizeBlogPostFull(postNode);
      const sorted = sortPostsByDateDesc(allNodes);
      const { previous, next } = adjacentNavPosts(
        sorted.map((p) => ({
          slug: (p as { slug?: string }).slug,
          uri: (p as { uri?: string }).uri,
          title: (p as { title?: string }).title,
        })),
        slugClean
      );
      return { post, previous, next };
    }
  } catch (err) {
    console.warn(`[cache] case-studies batch failed for "${slugClean}", falling back to WPGraphQL —`, err instanceof Error ? err.message : err);
  }

  // WPGraphQL fallback (new post not yet in plugin cache)
  try {
    const raw = await wpFetch<{
      post?: Record<string, unknown> | null;
      posts?: { nodes: Record<string, unknown>[] };
    }>(Q.CASE_STUDY_PAGE, { slug: slugClean });

    if (!raw.post) return null;

    const post = normalizeBlogPostFull(raw.post);
    const sorted = sortPostsByDateDesc((raw.posts?.nodes || []));
    const currentSlug = (raw.post as { slug?: string }).slug || slugClean;
    const { previous, next } = adjacentNavPosts(
      sorted.map((p) => ({
        slug: (p as { slug?: string }).slug,
        uri: (p as { uri?: string }).uri,
        title: (p as { title?: string }).title,
      })),
      currentSlug
    );
    return { post, previous, next };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("WPGraphQL case study failed, using mock:", msg);
    return MOCK_CASE_STUDY_POST;
  }
}

const MOCK_ABOUT = {
  about: {
    nodes: [
      normalizeAboutNode({
        title: "About",
        metadata: { metaTitle: "About", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        aboutHero: {
          aboutHeroTitle: "",
          aboutHeroText: "",
          aboutHeroLink: { title: "", url: "/", target: "_self" },
        },
        aboutMission: { aboutMissionTitle: "", aboutMissionText: "" },
        aboutQuote: {
          aboutQuoteImage: {
            sourceUrl: "/assets/img/about-illustration.webp",
            altText: "",
            mediaDetails: { width: 800, height: 600 },
          },
          aboutQuoteText: "",
          aboutQuoteAuthor: "",
        },
        aboutStory: { aboutStoryTitle: "", aboutStoryList: [] },
        aboutValues: { aboutValuesTitle: "", aboutValuesList: [] },
        aboutSmallCta: { aboutSmallCtaTitle: "", aboutSmallCtaLink: null },
        aboutContributors: { aboutContributorsTitle: "", aboutContributorsText: "", aboutContributorsTeam: [] },
        aboutInvestors: { aboutInvestorsTitle: "", aboutInvestorsText: "", aboutInvestorsList: [] },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_CONTACT = {
  contact: {
    nodes: [
      normalizeContactNode({
        title: "Contact",
        metadata: { metaTitle: "Contact", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        contactHero: { contactHeroTitle: "", contactHeroText: "" },
        contactForm: {
          contactFormTitle: "",
          contactFormText: "",
          contactFormHubspot: {
            contactFormHubspotPortalId: "",
            contactFormHubspotFormId: "",
          },
          contactFormLinks: [],
        },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_COMMUNITY = {
  community: {
    nodes: [
      normalizeCommunityNode({
        title: "Community",
        metadata: { metaTitle: "Community", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        communityHero: { communityHeroTitle: "", communityHeroText: "" },
        communityBuild: { communityBuildTitle: "", communityBuildText: "", communityBuildBoxes: [] },
        communityEvents: {
          communityEventsTitle: "",
          communityEventsIcon: { sourceUrl: "/assets/img/meltano-logo.svg" },
          communityEventsText: "",
          communityEventsLink: { title: "", url: "/", target: "_self" },
        },
        communityGear: { communityGearTitle: "", communityGearText: "", communityGearType: [] },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_PRICING = {
  pricing: {
    nodes: [
      normalizePricingTable({
        title: "Pricing",
        metadata: { metaTitle: "Pricing", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        pricingHero: { pricingHeroTitle: "", pricingHeroText: "" },
        pricingTable: { pricingTableItem: [] },
        costComparison: { costCompareLink: "", costCompareTitle: "", costCategoryTabs: [] },
        contactFaq: null,
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_PRODUCT = {
  product: {
    nodes: [
      normalizeProductNode({
        title: "Product",
        metadata: { metaTitle: "Product", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        productHero: {
          productHeroTitle: "",
          productHeroText: "",
          productHeroButton1: { title: "", url: "/", target: "_self" },
          productHeroButton2: { title: "", url: "/", target: "_self" },
          productHeroBox: [],
        },
        productTabs: { productTabsTitle: "", productTab: [] },
        productDifference: null,
        latest: { latestTitle: "", latestLink: null },
      } as Record<string, unknown>),
    ],
  },
  stickyPosts: { edges: [] },
};

const MOCK_PRESS = {
  press: {
    nodes: [
      normalizePressNode({
        title: "Press",
        metadata: { metaTitle: "Press", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        pressHero: { pressHeroTitle: "", pressHeroText: "" },
        pressTabs: { pressTabsTab: [] },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_PARTNERS = {
  partners: {
    nodes: [
      normalizePartnersNode({
        title: "Partners",
        metadata: { metaTitle: "Partners", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        partnersHero: { partnersHeroTitle: "", partnersHeroText: "" },
        partnersMeet: { partnersMeetGroup: [] },
        partnersForm: {
          partnersFormTitle: "",
          partnersFormText: "",
          partnersFormHubspot: {
            partnersFormHubspotPortalId: "",
            partnersFormHubspotFormId: "",
          },
        },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_PRICING_CALC = {
  pricingcalculator: {
    nodes: [
      {
        title: "pricingcalculator",
        themePicker: { themePicker: "" },
        pricingCalculator: null,
        connectorPricing: { connectors: [] },
      },
    ],
  },
};

const MOCK_TERMS = {
  tos: {
    nodes: [
      normalizeLegalNode({
        title: "Terms of service",
        metadata: { metaTitle: "Terms", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        content: "<p>Terms content is loaded from WordPress when WPGRAPHQL_URL is set.</p>",
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_PRIVACY = {
  privacy: {
    nodes: [
      normalizeLegalNode({
        title: "Privacy policy",
        metadata: { metaTitle: "Privacy", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        content: "<p>Privacy content is loaded from WordPress when WPGRAPHQL_URL is set.</p>",
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_DPA = {
  dpa: {
    nodes: [
      normalizeLegalNode({
        title: "Data Processing Addendum",
        metadata: { metaTitle: "DPA", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        content: "<p>DPA content is loaded from WordPress when WPGRAPHQL_URL is set.</p>",
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_THANK_YOU = {
  thankyou: {
    nodes: [
      pageNodeFeatured({
        title: "Thank you",
        metadata: { metaTitle: "Thank you", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
        thankYouHero: { thankYouHeroTitle: "Thank you", thankYouHeroText: "" },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_NOT_FOUND = {
  notfound: {
    nodes: [
      pageNodeFeatured({
        title: "404",
        metadata: { metaTitle: "404", metaDescription: "" },
        featuredImage: null,
        themePicker: { themePicker: "" },
      } as Record<string, unknown>),
    ],
  },
};

const MOCK_BLOG = {
  blog: {
    nodes: [
      {
        title: "Blog",
        metadata: { metaTitle: "Blog", metaDescription: "" },
        featuredBlogImage: null,
        themePicker: { themePicker: "" },
        blogHero: { blogHeroTitle: "Blog", blogHeroDescription: "" },
      },
    ],
  },
  latestPost: { edges: [] },
  allWpPost: { edges: [] },
  allWpCategory: { nodes: [] },
};

const MOCK_CASE_STUDY_POST: BlogPostPageData = {
  post: normalizeBlogPostFull({
    id: "mock-cs",
    uri: "/sample-case-study/",
    title: "Sample case study",
    excerpt: "<p>Excerpt</p>",
    content:
      "<p>WordPress content loads here when <code>WPGRAPHQL_URL</code> is set.</p>",
    date: "2026-01-01T12:00:00",
    categories: { nodes: [{ name: "Customer story", uri: "/category/customer-story/" }] },
    author: { node: { name: "Author", avatar: { url: "/assets/img/ogimg.png" } } },
    featuredImage: null,
  }),
  previous: null,
  next: null,
};

// ---------------------------------------------------------------------------
// Podcast — WPGraphQL (podcasts custom post type)
// ---------------------------------------------------------------------------

type PodcastLink = {
  podLink?: { target?: string; title?: string; url?: string } | null;
  rssFeed?: { target?: string; title?: string; url?: string } | null;
  spotifyPodcast?: { target?: string; title?: string; url?: string } | null;
  applePodcasts?: { target?: string; title?: string; url?: string } | null;
};

/** Splits "S3E7 – Actual Title" → { badge: "S3 · E7", displayTitle: "Actual Title" } */
function parseEpisodeTitle(raw: string): { badge: string | null; displayTitle: string } {
  const match = raw.match(/^(S\d+E\d+)\s*[–—-]\s*(.+)$/i);
  if (!match) return { badge: null, displayTitle: raw };
  const badge = match[1].toUpperCase().replace(/S(\d+)E(\d+)/i, "S$1 · E$2");
  return { badge, displayTitle: match[2].trim() };
}

type TaxonomyNode = { id?: string; name?: string; slug?: string; link?: string };

function normalizePodcastEpisode(node: Record<string, unknown>) {
  const n = node as {
    id?: string;
    databaseId?: number;
    uri?: string;
    title?: string;
    date?: string;
    slug?: string;
    podcastId?: string | null;
    content?: string;
    featuredImage?: unknown;
    podcastLink?: PodcastLink;
    seasons?: { nodes?: TaxonomyNode[] };
    guests?: { nodes?: TaxonomyNode[] };
    hosts?: { nodes?: TaxonomyNode[] };
  };
  const { badge, displayTitle } = parseEpisodeTitle(n.title || "");
  return {
    id: n.id,
    databaseId: n.databaseId,
    slug: n.slug || "",
    link: `/podcasts/${n.slug}/`,
    title: n.title || "",
    displayTitle,
    episodeBadge: badge,
    date: formatWpDate(n.date, "dd MMM yyyy"),
    podcastId: n.podcastId ?? null,
    content: n.content || "",
    featuredImage: mapFeaturedImageField(
      n.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
    ),
    podcastLink: n.podcastLink ?? null,
    seasons: n.seasons?.nodes ?? [],
    guests: n.guests?.nodes ?? [],
    hosts: n.hosts?.nodes ?? [],
  };
}

function normalizePodcastEpisodeFull(node: Record<string, unknown>) {
  return {
    ...normalizePodcastEpisode(node),
    date: formatWpDate((node as { date?: string }).date, "MMMM dd yyyy"),
  };
}

type PodcastEpisodesResult = {
  podcasts?: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    nodes: Record<string, unknown>[];
  };
};

async function _doFetchAllPodcastEpisodes(): Promise<Record<string, unknown>[]> {
  try {
    const cached = await wpCachedFetch<{ podcasts?: { nodes: Record<string, unknown>[] } }>('podcasts');
    if (cached.podcasts?.nodes?.length) {
      console.log(`[cache] HIT: /custom/v1/podcasts (${cached.podcasts.nodes.length} episodes)`);
      return cached.podcasts.nodes;
    }
  } catch (err) {
    console.warn('[cache] MISS: /custom/v1/podcasts —', err instanceof Error ? err.message : err);
  }

  try {
    const allNodes: Record<string, unknown>[] = [];
    let cursor: string | null = null;
    do {
      const result: PodcastEpisodesResult = await wpFetch<PodcastEpisodesResult>(
        Q.PODCAST_EPISODES_PAGE,
        cursor ? { after: cursor } : {}
      );
      const nodes = result.podcasts?.nodes || [];
      allNodes.push(...nodes);
      cursor = result.podcasts?.pageInfo.hasNextPage ? result.podcasts.pageInfo.endCursor : null;
    } while (cursor);
    return allNodes;
  } catch (err) {
    console.error("[podcast] PODCAST_EPISODES_PAGE query failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

function fetchAllPodcastEpisodes(): Promise<Record<string, unknown>[]> {
  if (!_processCache.podcasts) _processCache.podcasts = _doFetchAllPodcastEpisodes();
  return _processCache.podcasts;
}

function adjacentNavPodcasts(
  sorted: { slug?: string; title?: string }[],
  currentSlug: string
): {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const idx = sorted.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { previous: null, next: null };
  const newer = idx > 0 ? sorted[idx - 1] : null;
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  return {
    previous: older ? { slug: older.slug || "", title: older.title || "" } : null,
    next: newer ? { slug: newer.slug || "", title: newer.title || "" } : null,
  };
}

export type RelatedEpisode = {
  slug: string;
  link: string;
  title: string;
  displayTitle: string;
  episodeBadge: string | null;
  date: string;
  featuredImage: ReturnType<typeof mapFeaturedImageField>;
};

export type PodcastEpisodePageData = {
  episode: ReturnType<typeof normalizePodcastEpisodeFull>;
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  relatedEpisodes: RelatedEpisode[];
};

export async function getPodcastData() {
  return withWpFallback("podcast index", MOCK_PODCAST, async () => {
    // fetchAllPodcastEpisodes never throws — errors are logged inside it
    const [pageRaw, allEpisodeNodes] = await Promise.all([
      wpFetch<{ pages?: { nodes: Record<string, unknown>[] } }>(Q.PODCAST_PAGE)
        .catch((err) => {
          console.error("[podcast] PODCAST_PAGE query failed:", err instanceof Error ? err.message : err);
          return { pages: { nodes: [] } };
        }),
      fetchAllPodcastEpisodes(),
    ]);

    console.log("[podcast] pageRaw nodes:", pageRaw.pages?.nodes?.length, "| episodes:", allEpisodeNodes.length);

    const pageNode = pageRaw.pages?.nodes?.[0] ?? MOCK_PODCAST.podcast.nodes[0];
    const normalizedPage = { ...pageNode } as Record<string, unknown>;
    const fi = normalizedPage.featuredBlogImage as Parameters<typeof mapFeaturedImageField>[0];
    normalizedPage.featuredBlogImage = mapFeaturedImageField(fi);

    const allEpisodes = sortPostsByDateDesc(allEpisodeNodes).map(normalizePodcastEpisode);

    return {
      podcast: { nodes: [normalizedPage] },
      allPodcastEpisodes: { edges: allEpisodes.map((episode) => ({ episode })) },
    };
  });
}

export async function getPodcastEpisodeSlugs(): Promise<string[]> {
  if (!isWpGraphqlFetchEnabled()) return [];
  try {
    const cached = await wpCachedFetch<{ podcasts?: { nodes: { slug?: string }[] } }>('podcasts');
    const slugs = (cached.podcasts?.nodes || []).map((n) => n.slug).filter((s): s is string => Boolean(s));
    if (slugs.length) return slugs;
  } catch {
    // fall through to WPGraphQL
  }
  try {
    type SlugsResult = {
      podcasts?: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: { slug?: string }[] };
    };
    const allSlugs: string[] = [];
    let cursor: string | null = null;
    do {
      const result: SlugsResult = await wpFetch<SlugsResult>(
        Q.PODCAST_EPISODE_SLUGS,
        cursor ? { after: cursor } : {}
      );
      const nodes = result.podcasts?.nodes || [];
      allSlugs.push(...nodes.map((n) => n.slug).filter((s): s is string => Boolean(s)));
      cursor = result.podcasts?.pageInfo.hasNextPage ? result.podcasts.pageInfo.endCursor : null;
    } while (cursor);
    return allSlugs;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("WPGraphQL podcast slugs failed:", msg);
    return [];
  }
}

type RawSiblingNode = {
  slug?: string;
  title?: string;
  date?: string;
  podcastId?: string | null;
  featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } } | null;
  seasons?: { nodes?: { name?: string; slug?: string }[] };
};

export async function getPodcastEpisodeData(slug: string): Promise<PodcastEpisodePageData | null> {
  const slugClean = decodeURIComponent(slug.replace(/^\/+|\/+$/g, "").split("/").pop() || slug);
  if (!isWpGraphqlFetchEnabled()) return MOCK_PODCAST_EPISODE;

  try {
    // fetchAllPodcastEpisodes uses the batch cache (_memCache) — already fetched
    // during getStaticPaths. Find the episode by slug, no individual API call needed.
    const allEpisodeNodes = await fetchAllPodcastEpisodes();
    const episodeNode = allEpisodeNodes.find((n) => (n as { slug?: string }).slug === slugClean);

    if (!episodeNode) {
      // New episode not in cache yet — fall through to WPGraphQL below
      throw new Error(`Episode "${slugClean}" not found in batch cache`);
    }

    const episode = normalizePodcastEpisodeFull(episodeNode);
    const sorted = sortPostsByDateDesc(allEpisodeNodes);
    const { previous, next } = adjacentNavPodcasts(
      sorted.map((p) => ({
        slug: (p as { slug?: string }).slug,
        title: (p as { title?: string }).title,
      })),
      slugClean
    );

    const episodeSeasonSlugs = new Set(
      episode.seasons.map((s: { slug?: string }) => s.slug).filter((s): s is string => Boolean(s))
    );

    // Debug: check if sibling nodes actually have seasons data
    const sampleSiblingSeasons = allEpisodeNodes
      .filter((n) => (n as RawSiblingNode).slug !== slugClean)
      .slice(0, 3)
      .map((n) => ({ slug: (n as RawSiblingNode).slug, seasons: (n as RawSiblingNode).seasons }));
    console.log(`[podcast] episode "${slugClean}" — seasons:`, [...episodeSeasonSlugs], `| allEpisodes: ${allEpisodeNodes.length} | sample sibling seasons:`, JSON.stringify(sampleSiblingSeasons));

    const relatedEpisodes: RelatedEpisode[] = sorted
      .filter((p) => {
        const node = p as RawSiblingNode;
        if (!node.slug || node.slug === slugClean) return false;
        if (episodeSeasonSlugs.size > 0) {
          const nodeSlugs = node.seasons?.nodes?.map((s) => s.slug) ?? [];
          return nodeSlugs.some((s) => s && episodeSeasonSlugs.has(s));
        }
        return true;
      })
      .map((p) => {
        const node = p as RawSiblingNode;
        const { badge, displayTitle } = parseEpisodeTitle(node.title || "");
        return {
          slug: node.slug || "",
          link: `/podcasts/${node.slug}/`,
          title: node.title || "",
          displayTitle,
          episodeBadge: badge,
          date: formatWpDate(node.date, "dd MMM yyyy"),
          featuredImage: mapFeaturedImageField(
            node.featuredImage as Parameters<typeof mapFeaturedImageField>[0]
          ),
        };
      });

    return { episode, previous, next, relatedEpisodes };
  } catch (err) {
    // Batch cache miss (e.g. new episode) — fall back to individual WPGraphQL query
    console.warn(`[cache] podcast batch miss for "${slugClean}", falling back to WPGraphQL —`, err instanceof Error ? err.message : err);
  }

  try {
    const [raw, allEpisodeNodes] = await Promise.all([
      wpFetch<{ podcast?: Record<string, unknown> | null }>(Q.PODCAST_EPISODE_PAGE, { slug: slugClean }),
      fetchAllPodcastEpisodes(),
    ]);

    if (!raw.podcast) return null;

    const episode = normalizePodcastEpisodeFull(raw.podcast);
    const sorted = sortPostsByDateDesc(allEpisodeNodes);
    const { previous, next } = adjacentNavPodcasts(
      sorted.map((p) => ({ slug: (p as { slug?: string }).slug, title: (p as { title?: string }).title })),
      slugClean
    );

    const episodeSeasonSlugs = new Set(
      episode.seasons.map((s: { slug?: string }) => s.slug).filter((s): s is string => Boolean(s))
    );

    const relatedEpisodes: RelatedEpisode[] = sorted
      .filter((p) => {
        const node = p as RawSiblingNode;
        if (!node.slug || node.slug === slugClean) return false;
        if (episodeSeasonSlugs.size > 0) {
          const nodeSlugs = node.seasons?.nodes?.map((s) => s.slug) ?? [];
          return nodeSlugs.some((s) => s && episodeSeasonSlugs.has(s));
        }
        return true;
      })
      .map((p) => {
        const node = p as RawSiblingNode;
        const { badge, displayTitle } = parseEpisodeTitle(node.title || "");
        return {
          slug: node.slug || "",
          link: `/podcasts/${node.slug}/`,
          title: node.title || "",
          displayTitle,
          episodeBadge: badge,
          date: formatWpDate(node.date, "dd MMM yyyy"),
          featuredImage: mapFeaturedImageField(node.featuredImage as Parameters<typeof mapFeaturedImageField>[0]),
        };
      });

    return { episode, previous, next, relatedEpisodes };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("WPGraphQL podcast episode failed:", msg);
    throw err;
  }
}

const MOCK_PODCAST = {
  podcast: {
    nodes: [
      {
        title: "Podcast",
        metadata: { metaTitle: "Podcast", metaDescription: "" },
        featuredBlogImage: null,
        themePicker: { themePicker: "" },
        podcastHero: {
          podcastHeroTitle: "Podcast",
          podcastHeroDescription: "",
          podcastHeroSubDescription: "",
        },
      },
    ],
  },
  allPodcastEpisodes: { edges: [] },
};

const MOCK_PODCAST_EPISODE: PodcastEpisodePageData = {
  episode: normalizePodcastEpisodeFull({
    id: "mock",
    date: "2026-01-01T12:00:00",
    slug: "sample-episode",
    uri: "/podcasts/sample-episode/",
    title: "Sample Podcast Episode",
    content: "<p>Episode content loads when WPGRAPHQL_URL is set.</p>",
    featuredImage: null,
    podcastLink: null,
  }),
  previous: null,
  next: null,
  relatedEpisodes: [],
};

// ---------------------------------------------------------------------------

const MOCK_CASE_STUDIES = {
  caseStudiesPage: {
    nodes: [
      {
        title: "Case Studies",
        metadata: { metaTitle: "Case Studies", metaDescription: "" },
        featuredCaseStudyImage: null,
        themePicker: { themePicker: "" },
        caseStudyHero: {
          caseStudyHeroTitle: "Case Studies",
          caseStudyHeroDescription: "",
        },
      },
    ],
  },
  latestCaseStudy: { edges: [] },
  allCaseStudies: { edges: [] },
  allCaseStudyCategory: { nodes: [] },
};
