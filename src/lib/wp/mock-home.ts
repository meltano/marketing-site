/** Offline / CI placeholder when SKIP_WP_GRAPHQL=1 — replace with real WP data in production. */
export const MOCK_HOME_DATA = {
  home: {
    nodes: [
      {
        themePicker: { themePicker: "" },
        metadata: {
          metaTitle: "Meltano",
          metaDescription: "Marketing site (Next.js)",
        },
        featuredImage: null,
        hero: {
          heroTitle: "Build data-powered features in minutes",
          heroText: "Configure <code>SKIP_WP_GRAPHQL</code> off and set <code>WPGRAPHQL_URL</code> for live WordPress content.",
          heroAlign: "center",
          heroButton1: {
            url: "https://docs.meltano.com",
            title: "Documentation",
            target: "_blank",
          },
          heroButton2: null,
          heroLink: null,
        },
        sources: {
          sourcesTitle: "Sources",
          sourcesText: "Connect to your data stack.",
          sourcesLink: {
            title: "Meltano Hub",
            url: "https://hub.meltano.com",
            target: "_blank",
          },
        },
        links: { linksArray: [] },
        workflow: {
          workflowHeading: "",
          workflowDescription: "",
          workflowArray: [],
        },
        community: { communityArray: [] },
        testimonials: {
          testimonialsHeading: "",
          testimonialsArray: [],
        },
        latest: {
          latestTitle: "",
          latestLink: { title: "", url: "/", target: "_self" },
        },
        costComparison: {
          costCompareLink: "",
          costCompareTitle: "",
          costCategoryTabs: [],
        },
      },
    ],
  },
  stickyPosts: { edges: [] },
};
