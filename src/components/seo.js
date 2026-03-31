import Head from "next/head";

/**
 * Server-rendered meta tags (so HTML has correct SEO before hydration).
 * Open Graph is best served via `export const metadata` on each page, but we
 * keep this as a fallback for the pages router component trees.
 */
const Seo = ({ title, description, image, article, summary, date }) => {
  const asText = value =>
    typeof value === "string" || typeof value === "number" ? String(value) : "";
  const safeTitle = asText(title);
  const safeDescription = asText(description);
  const safeSummary = asText(summary);
  const safeDate = asText(date);
  const metaImage = `https://meltano.com${image || "/assets/img/ogimg.png"}`;

  return (
    <Head>
      {safeTitle ? <title>{safeTitle}</title> : null}
      {safeDescription ? <meta name="description" content={safeDescription} /> : null}

      {/* Open Graph */}
      {safeTitle ? <meta property="og:title" content={safeTitle} /> : null}
      {safeDescription ? <meta property="og:description" content={safeDescription} /> : null}
      <meta property="og:image" content={metaImage} />
      {article ? <meta property="og:type" content="article" /> : null}

      {/* Twitter */}
      <meta name="twitter:image" content={metaImage} />

      {/* Extra legacy fields */}
      {safeSummary ? <meta name="summary" content={safeSummary} /> : null}
      {safeDate ? <meta name="article:published_time" content={safeDate} /> : null}
    </Head>
  );
};

export default Seo;

