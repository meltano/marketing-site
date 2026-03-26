import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import Providers from "@/components/Providers";
import Layout from "@/components/layout";
import "@/styles/globals.css";

const ROUTES_TO_PREFETCH = [
  "/",
  "/blog",
  "/product",
  "/about",
  "/pricing",
  "/partners",
  "/press",
  "/community",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/data-processing-addendum",
  "/pricingcalculator",
  "/thank-you",
  "/404",
];

function routeToNextDataPath(route: string) {
  // Next uses `index.json` for `/` in `/_next/data/<buildId>/...`.
  if (route === "/") return "/index.json";
  return `${route}.json`;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const didPrefetchRef = useRef(false);

  useEffect(() => {
    if (!router?.prefetch || didPrefetchRef.current) return;
    didPrefetchRef.current = true;

    // Avoid prefetching on very constrained networks.
    const conn = (navigator as unknown as { connection?: unknown }).connection as
      | { saveData?: boolean; effectiveType?: string }
      | undefined;
    if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
      return;
    }

    const schedule = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(cb, {
          timeout: 2000,
        });
      } else {
        setTimeout(cb, 200);
      }
    };

    schedule(() => {
      ROUTES_TO_PREFETCH.forEach((path) => {
        try {
          void router.prefetch(path);
        } catch {
          // Ignore prefetch failures; navigation still works normally.
        }
      });
    });
  }, [router]);

  // Persist/cache the Next.js page-data JSON in a Service Worker so
  // navigations can reuse data instantly (even after refresh).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const schedule = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(cb, {
          timeout: 3000,
        });
      } else {
        setTimeout(cb, 200);
      }
    };

    const buildId = (window as unknown as { __NEXT_DATA__?: { buildId?: string } })
      .__NEXT_DATA__?.buildId;
    if (!buildId) return;

    const cacheName = `next-data-${buildId}`;
    const base = `/_next/data/${buildId}`;
    const urls = ROUTES_TO_PREFETCH.map(
      (route) => `${base}${routeToNextDataPath(route)}`
    );

    // Register then immediately ask the SW to precache these URLs.
    navigator.serviceWorker
      .register("/sw.js")
      .then(async (reg) => {
        // Wait until SW is active.
        await navigator.serviceWorker.ready;
        const sw = navigator.serviceWorker.controller || reg.active;
        if (sw) {
          schedule(() => {
            sw.postMessage({ type: "PRECACHE_NEXT_DATA", cacheName, urls });
          });
        }
      })
      .catch(() => {
        // If SW fails (e.g., blocked by browser policies), navigation still works.
      });
  }, []);

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P66BT8VF');`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H5HPTMG70X"
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H5HPTMG70X');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P66BT8VF"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
}
