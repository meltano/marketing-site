import Head from "next/head";

/**
 * Server-rendered meta tags (so HTML has correct SEO before hydration).
 * Open Graph is best served via `export const metadata` on each page, but we
 * keep this as a fallback for the pages router component trees.
 */
const Seo = ({ title, description, image, article, summary, date }) => {
  const metaImage = `https://meltano.com${image || "/assets/img/ogimg.png"}`;

  return (
    <Head>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}

      {/* Open Graph */}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:image" content={metaImage} />
      {article ? <meta property="og:type" content="article" /> : null}

      {/* Twitter */}
      <meta name="twitter:image" content={metaImage} />

      {/* Extra legacy fields */}
      {summary ? <meta name="summary" content={summary} /> : null}
      {date ? <meta name="article:published_time" content={date} /> : null}
    </Head>
  );
};

export default Seo;

