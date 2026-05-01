import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: process.env.NETLIFY !== "true",
  async redirects() {
    return [
      // Exact slug matches
      {
        source: "/etl-tools-ultimate-guide-towards-business-intelligence",
        destination:
          "https://meltano.com/blog/etl-tools-ultimate-guide-towards-business-intelligence",
        permanent: true,
      },
      {
        source:
          "/business-intelligence-consulting-10-key-considerations-before-choosing-a-bi-partner",
        destination:
          "https://meltano.com/blog/business-intelligence-consulting-10-key-considerations-before-choosing-a-bi-partner",
        permanent: true,
      },
      {
        source:
          "/slash-your-ga4-costs-by-99-4-without-compromising-performance",
        destination:
          "https://meltano.com/blog/slash-your-ga4-costs-by-99-4-without-compromising-performance",
        permanent: true,
      },
      {
        source:
          "/how-etl-tools-fit-into-a-forward-thinking-data-platform-approach-to-bi",
        destination:
          "https://meltano.com/blog/how-etl-tools-fit-into-a-forward-thinking-data-platform-approach-to-bi",
        permanent: true,
      },
      {
        source:
          "/avoid-becoming-next-ticketmaster-or-santander-public-vs-private-cloud-etl-tools-data-breaches",
        destination:
          "https://meltano.com/blog/avoid-becoming-next-ticketmaster-or-santander-public-vs-private-cloud-etl-tools-data-breaches",
        permanent: true,
      },
      {
        source: "/your-guide-to-loading-quality-test-data",
        destination:
          "https://meltano.com/blog/your-guide-to-loading-quality-test-data",
        permanent: true,
      },
      {
        source:
          "/7-data-strategies-that-work-what-the-best-data-teams-do-differently",
        destination:
          "https://meltano.com/blog/7-data-strategies-that-work-what-the-best-data-teams-do-differently",
        permanent: true,
      },
      {
        source: "/building-data-trust-through-effective-etl-staging-environments",
        destination:
          "https://meltano.com/blog/building-data-trust-through-effective-etl-staging-environments",
        permanent: true,
      },
      {
        source:
          "/why-most-sql-server-data-tools-migrations-fail-and-how-to-build-better-ones",
        destination:
          "https://meltano.com/blog/why-most-sql-server-data-tools-migrations-fail-and-how-to-build-better-ones",
        permanent: true,
      },
      {
        source:
          "/from-tool-mastery-to-systems-design-how-data-engineers-actually-grow",
        destination:
          "https://meltano.com/blog/from-tool-mastery-to-systems-design-how-data-engineers-actually-grow",
        permanent: true,
      },
      {
        source:
          "/how-smart-data-teams-cut-costs-without-sacrificing-performance",
        destination:
          "https://meltano.com/blog/how-smart-data-teams-cut-costs-without-sacrificing-performance",
        permanent: true,
      },
      {
        source:
          "/snowflake-columnar-storage-why-this-architecture-could-cut-your-analytics-costs-by-70",
        destination:
          "https://meltano.com/blog/snowflake-columnar-storage-why-this-architecture-could-cut-your-analytics-costs-by-70",
        permanent: true,
      },
      {
        source:
          "/understanding-todays-etl-pricing-landscape-column-vs-row-approaches",
        destination:
          "https://meltano.com/blog/understanding-todays-etl-pricing-landscape-column-vs-row-approaches",
        permanent: true,
      },
      {
        source: "/snowflake-vs-databricks-pricing-whos-really-playing-fair",
        destination:
          "https://meltano.com/blog/snowflake-vs-databricks-pricing-whos-really-playing-fair",
        permanent: true,
      },
      {
        source:
          "/data-lake-vs-data-warehouse-whats-the-difference-and-which-should-you-choose",
        destination:
          "https://meltano.com/blog/data-lake-vs-data-warehouse-whats-the-difference-and-which-should-you-choose",
        permanent: true,
      },
      {
        source:
          "/choosing-between-star-and-snowflake-schemas-for-your-data-warehouse",
        destination:
          "https://meltano.com/blog/choosing-between-star-and-snowflake-schemas-for-your-data-warehouse",
        permanent: true,
      },
      {
        source:
          "/7-hours-of-firefighting-what-google-clouds-june-outage-really-cost-data-teams",
        destination:
          "https://meltano.com/blog/7-hours-of-firefighting-what-google-clouds-june-outage-really-cost-data-teams-2",
        permanent: true,
      },
      {
        source:
          "/the-hidden-business-cost-of-row-based-etl-pricing-when-growth-becomes-a-liability",
        destination:
          "https://meltano.com/blog/the-hidden-business-cost-of-row-based-etl-pricing-when-growth-becomes-a-liability",
        permanent: true,
      },
      {
        source:
          "/the-processing-paradox-why-row-based-etl-pricing-ignores-how-analytics-actually-works",
        destination:
          "https://meltano.com/blog/the-processing-paradox-why-row-based-etl-pricing-ignores-how-analytics-actually-works",
        permanent: true,
      },
      {
        source: "/your-biggest-budget-line-isnt-tools-its-time-wasted",
        destination:
          "https://meltano.com/blog/your-biggest-budget-line-isnt-tools-its-time-wasted",
        permanent: true,
      },
      {
        source:
          "/the-conversations-data-leaders-are-planning-for-big-data-ldn-2025-but-wont-admit-publicly",
        destination:
          "https://meltano.com/blog/the-conversations-data-leaders-are-planning-for-big-data-ldn-2025-but-wont-admit-publicly",
        permanent: true,
      },
      {
        source:
          "/when-kiss-cams-go-wrong-what-astronomers-pr-crisis-reveals-about-vendor-culture",
        destination:
          "https://meltano.com/blog/when-kiss-cams-go-wrong-what-astronomers-pr-crisis-reveals-about-vendor-culture",
        permanent: true,
      },
      {
        source:
          "/8-hidden-costs-in-row-based-etl-pricing-and-how-to-eliminate-them",
        destination:
          "https://meltano.com/blog/8-hidden-costs-in-row-based-etl-pricing-and-how-to-eliminate-them",
        permanent: true,
      },
      {
        source: "/how-to-reduce-etl-costs-without-sacrificing-performance",
        destination:
          "https://meltano.com/blog/how-to-reduce-etl-costs-without-sacrificing-performance",
        permanent: true,
      },
      {
        source:
          "/why-dbt-optimisation-hits-a-ceiling-and-how-sql-mesh-breaks-through",
        destination:
          "https://meltano.com/blog/why-dbt-optimisation-hits-a-ceiling-and-how-sql-mesh-breaks-through",
        permanent: true,
      },
      {
        source:
          "/why-fivetrans-tobiko-data-acquisition-signals-trouble-for-data-teams",
        destination:
          "https://meltano.com/blog/why-fivetrans-tobiko-data-acquisition-signals-trouble-for-data-teams",
        permanent: true,
      },
      {
        source: "/how-to-escape-your-etl-vendor-without-risk-or-disruption",
        destination:
          "https://meltano.com/blog/how-to-escape-your-etl-vendor-without-risk-or-disruption",
        permanent: true,
      },
      {
        source: "/the-finops-skills-every-data-engineer-needs-in-2025",
        destination:
          "https://meltano.com/blog/the-finops-skills-every-data-engineer-needs-in-2025",
        permanent: true,
      },
      {
        source: "/how-to-optimise-olap-and-oltp-systems-for-better-performance",
        destination:
          "https://meltano.com/blog/how-to-optimise-olap-and-oltp-systems-for-better-performance",
        permanent: true,
      },
      {
        source:
          "/how-oltp-and-olap-databases-differ-and-why-it-matters-for-your-data-architecture",
        destination:
          "https://meltano.com/blog/how-oltp-and-olap-databases-differ-and-why-it-matters-for-your-data-architecture",
        permanent: true,
      },
      {
        source: "/how-resident-advisor-escaped-year-long-etl-firefighting",
        destination:
          "https://meltano.com/blog/how-resident-advisor-escaped-year-long-etl-firefighting",
        permanent: true,
      },
      {
        source: "/data-pipeline-architecture/",
        destination:
          "https://meltano.com/blog/data-pipeline-architecture",
        permanent: true,
      },
      {
        source:
          "/how-duckdb-cuts-development-costs-without-touching-production",
        destination:
          "https://meltano.com/blog/how-duckdb-cuts-development-costs-without-touching-production",
        permanent: true,
      },
      {
        source: "/looking-for-arch",
        destination: "https://meltano.com/blog/looking-for-arch",
        permanent: true,
      },
      {
        source:
          "/mvf-makes-etl-7x-cheaper-while-migrating-1b-rows-across-60-sources",
        destination:
          "https://meltano.com/blog/mvf-makes-etl-7x-cheaper-while-migrating-1b-rows-across-60-sources",
        permanent: true,
      },
      {
        source:
          "/why-marketing-data-connectors-quietly-inflate-your-etl-costs",
        destination:
          "https://meltano.com/blog/why-marketing-data-connectors-quietly-inflate-your-etl-costs",
        permanent: true,
      },
      {
        source:
          "/aftermath-of-the-dbt-fivetran-merger-what-it-really-means-for-data-teams",
        destination:
          "https://meltano.com/blog/aftermath-of-the-dbt-fivetran-merger-what-it-really-means-for-data-teams",
        permanent: true,
      },
      {
        source: "/analytics-engineering-internal-risk-vs-external-rigor",
        destination:
          "https://meltano.com/blog/analytics-engineering-internal-risk-vs-external-rigor",
        permanent: true,
      },
      {
        source:
          "/google-sheets-for-analysts-how-to-eliminate-the-data-update-bottleneck",
        destination:
          "https://meltano.com/blog/google-sheets-for-analysts-how-to-eliminate-the-data-update-bottleneck",
        permanent: true,
      },
      {
        source: "/build-strategy-first-choose-technology-that-deserves-it",
        destination:
          "https://meltano.com/blog/build-strategy-first-choose-technology-that-deserves-it-2-2",
        permanent: true,
      },
      {
        source: "/why-saas-datapricing-modelsare-costing-morethan-they-should",
        destination:
          "https://meltano.com/blog/why-saas-datapricing-modelsare-costing-morethan-they-should",
        permanent: true,
      },
      {
        source:
          "/transforming-manufacturing-data-management-with-matatikas-etl-solution",
        destination:
          "https://meltano.com/blog/transforming-manufacturing-data-management-with-matatikas-etl-solution",
        permanent: true,
      },
      {
        source: "/zero-risk-etl-transformation",
        destination:
          "https://meltano.com/blog/zero-risk-etl-transformation",
        permanent: true,
      },
      {
        source: "/crypto-inspired-data-strategy",
        destination:
          "https://meltano.com/blog/crypto-inspired-data-strategy",
        permanent: true,
      },
      {
        source: "/why-data-migration-tools-fail",
        destination:
          "https://meltano.com/blog/why-data-migration-tools-fail",
        permanent: true,
      },
      {
        source: "/data-analytics-strategy-quantum-thinking",
        destination:
          "https://meltano.com/blog/data-analytics-strategy-quantum-thinking",
        permanent: true,
      },
      {
        source: "/switch-etl-tools-risk-free-migration",
        destination:
          "https://meltano.com/blog/switch-etl-tools-risk-free-migration",
        permanent: true,
      },
      {
        source: "/cut-etl-costs-without-disruption",
        destination:
          "https://meltano.com/blog/cut-etl-costs-without-disruption",
        permanent: true,
      },
      {
        source:
          "/etl-is-now-a-commodity-so-why-are-you-still-paying-a-premium",
        destination:
          "https://meltano.com/blog/etl-is-now-a-commodity-so-why-are-you-still-paying-a-premium",
        permanent: true,
      },
      {
        source: "/data-migration-framework",
        destination:
          "https://meltano.com/blog/data-migration-framework",
        permanent: true,
      },
      {
        source: "/column-vs-row-etl-pricing",
        destination:
          "https://meltano.com/blog/column-vs-row-etl-pricing",
        permanent: true,
      },
      {
        source: "/stop-scaling-what-you-dont-understand",
        destination:
          "https://meltano.com/blog/stop-scaling-what-you-dont-understand",
        permanent: true,
      },
      {
        source:
          "/the-little-bike-company-boosts-monthly-productivity-by-20-with-matatikas-streamlined-solution",
        destination:
          "https://meltano.com/blog/the-little-bike-company-boosts-monthly-productivity-by-20-with-matatikas-streamlined-solution",
        permanent: true,
      },
      {
        source: "/how-to-do-more-with-mixpanel-joined-up-analytics",
        destination:
          "https://meltano.com/blog/how-to-do-more-with-mixpanel-joined-up-analytics",
        permanent: true,
      },
      {
        source: "/baidu-etl-connector",
        destination:
          "https://meltano.com/blog/baidu-etl-connector-how-mvf-solved-an-unsupported-data-source",
        permanent: true,
      },
      {
        source: "/economics-of-the-modern-data-stack",
        destination:
          "https://meltano.com/blog/economics-of-the-modern-data-stack",
        permanent: true,
      },
      {
        source: "/google-sheets-stop-manually-uploading-spreadsheets",
        destination:
          "https://meltano.com/blog/google-sheets-stop-manually-uploading-spreadsheets",
        permanent: true,
      },
      {
        source: "/smart-way-connect-mixpanel-revenue-data",
        destination:
          "https://meltano.com/blog/smart-way-connect-mixpanel-revenue-data",
        permanent: true,
      },
      {
        source: "/ai-adoption-hypebeast",
        destination:
          "https://meltano.com/blog/ai-adoption-hypebeast",
        permanent: true,
      },
      {
        source: "/scale-mixpanel-data-efficiently-without-spiralling-costs",
        destination:
          "https://meltano.com/blog/scale-mixpanel-data-efficiently-without-spiralling-costs",
        permanent: true,
      },
      {
        source:
          "/three-things-data-leaders-should-kill-before-building-another-dashboard",
        destination:
          "https://meltano.com/blog/three-things-data-leaders-should-kill-before-building-another-dashboard",
        permanent: true,
      },
      {
        source: "/bi-worst-roi-modern-data-stack-service-trap",
        destination:
          "https://meltano.com/blog/bi-worst-roi-modern-data-stack-service-trap",
        permanent: true,
      },
      {
        source: "/etl-vendor-connectors",
        destination:
          "https://meltano.com/blog/etl-vendor-connectors",
        permanent: true,
      },
      {
        source: "/high-performance-data-teams-people-not-tools",
        destination:
          "https://meltano.com/blog/high-performance-data-teams-people-not-tools",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "meltano.com" },
      { protocol: "https", hostname: "www.meltano.com" },
      { protocol: "https", hostname: "**.meltano.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "matatika.com" },
      { protocol: "https", hostname: "**.matatika.com" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
