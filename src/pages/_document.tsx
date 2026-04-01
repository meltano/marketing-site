import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="content/assets/favicon.png" />
        {/* Google search console */}
        <meta
          name="google-site-verification"
          content="nBU72pHCzqKgFZhYFmyUEhz6eE4wdgVnZcipL8xU8Lo"
        />
        {/* Bing webmaster tools */}
        <meta name="msvalidate.01" content="3450BE2A63042B9CA99FAEDBCE04FC4F" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
