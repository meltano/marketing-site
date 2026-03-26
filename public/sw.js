// Cache Next.js data routes so client-side navigations can be instant.
// We cache only `/_next/data/*` JSON to keep the cache size reasonable.

const DATA_URL_PREFIX = "/_next/data/";
let CURRENT_CACHE_NAME = "next-data-unknown";

self.addEventListener("install", () => {
  // Activate immediately so the current client can start using the cache.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      // Prune old next-data-* caches.
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith("next-data-") && k !== CURRENT_CACHE_NAME)
          .map((k) => caches.delete(k))
      );
    })()
  );
});

async function cacheNextDataUrls(cacheName, urls) {
  if (!Array.isArray(urls) || urls.length === 0) return;

  CURRENT_CACHE_NAME = cacheName || CURRENT_CACHE_NAME;

  // Prune old caches for this strategy.
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((k) => k.startsWith("next-data-") && k !== CURRENT_CACHE_NAME)
      .map((k) => caches.delete(k))
  );

  const cache = await caches.open(CURRENT_CACHE_NAME);

  // Fetch + cache each JSON file.
  await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, { credentials: "same-origin" });
      if (!res || !res.ok) return;
      await cache.put(url, res.clone());
    })
  );
}

self.addEventListener("message", (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== "object") return;

  if (msg.type === "PRECACHE_NEXT_DATA") {
    const cacheName = msg.cacheName || CURRENT_CACHE_NAME;
    const urls = msg.urls || [];

    event.waitUntil(cacheNextDataUrls(cacheName, urls));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only intercept GET requests to Next data routes.
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!url.pathname.startsWith(DATA_URL_PREFIX)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CURRENT_CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;

      // Cache-miss: go to network and store for next time.
      const res = await fetch(request);
      if (res && res.ok) {
        await cache.put(request, res.clone());
      }
      return res;
    })()
  );
});

