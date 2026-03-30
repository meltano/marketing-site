import { format, parseISO } from "date-fns";

import {
  isWpGraphqlFetchEnabled,
  mapFeaturedImageField,
  mapMediaToGatsby,
  wpFetch,
} from "@/lib/wordpress";
import * as Q from "@/lib/wp/page-queries";
import { mediaToLocalChildSharp } from "@/lib/wp/wp-map";

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
    categories?: { nodes?: { name?: string; uri?: string }[] };
    author?: unknown;
    featuredImage?: unknown;
  };
  return {
    id: n.id,
    link: n.uri || "",
    title: n.title,
    excerpt: n.excerpt,
    date: formatWpDate(n.date, "MM/dd/yyyy"),
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

export async function getBlogData() {
  return withWpFallback("blog index", MOCK_BLOG, async () => {
    const raw = await wpFetch<{
      pages?: { nodes: Record<string, unknown>[] };
      posts?: { nodes: Record<string, unknown>[] };
      categories?: { nodes: { name?: string }[] };
    }>(Q.BLOG_PAGE);
    const blogNode = raw.pages?.nodes?.[0];
    if (!blogNode) throw new Error('No WordPress page with title "Blog"');
    const normalizedBlog = { ...blogNode } as Record<string, unknown>;
    const fi = normalizedBlog.featuredBlogImage as Parameters<typeof mapFeaturedImageField>[0];
    normalizedBlog.featuredBlogImage = mapFeaturedImageField(fi);

    const sortedPosts = sortPostsByDateDesc(raw.posts?.nodes || []);
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
    const raw = await wpFetch<{
      posts?: { nodes: { slug?: string }[] };
    }>(Q.BLOG_POST_SLUGS);
    return (raw.posts?.nodes || [])
      .map((n) => n.slug)
      .filter((s): s is string => Boolean(s));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("WPGraphQL blog post slugs failed, returning no paths:", msg);
    return [];
  }
}

export async function getBlogPostData(slug: string): Promise<BlogPostPageData | null> {
  const slugClean = decodeURIComponent(slug.replace(/^\/+|\/+$/g, "").split("/").pop() || slug);

  if (!isWpGraphqlFetchEnabled()) {
    return MOCK_BLOG_POST;
  }

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
    console.warn("WPGraphQL blog post failed, using mock:", msg);
    return MOCK_BLOG_POST;
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
