/**
 * Service Worker — Control de Gastos Supermercado
 * Estrategia: Cache First para assets locales, Network First para CDN externos.
 * Incrementa CACHE_VERSION para forzar actualización en todos los dispositivos.
 */

const CACHE_VERSION  = "v1.1.0";
const CACHE_NAME     = `gastos-super-${CACHE_VERSION}`;
const CACHE_CDN      = `gastos-super-cdn-${CACHE_VERSION}`;

// Assets locales — siempre cacheados
const LOCAL_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

// Assets de CDN — cacheados en primera visita
const CDN_ASSETS = [
  "https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js"
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(LOCAL_ASSETS)),
      caches.open(CACHE_CDN).then(cache =>
        Promise.allSettled(CDN_ASSETS.map(url => cache.add(url)))
      )
    ]).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_CDN)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora peticiones que no son GET
  if (request.method !== "GET") return;

  // CDN assets → Cache First (rara vez cambian)
  if (CDN_ASSETS.includes(request.url)) {
    event.respondWith(
      caches.open(CACHE_CDN).then(cache =>
        cache.match(request).then(cached =>
          cached || fetch(request).then(res => {
            cache.put(request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // Assets locales → Network First con fallback a caché (garantiza actualizaciones)
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(request)
        .then(res => {
          if (res.ok) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
          }
          return res;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match("/index.html")))
    );
    return;
  }

  // Tesseract.js y otros recursos externos → Network con fallback a caché
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ─── MENSAJE DESDE LA APP ────────────────────────────────────────────────────
// La app puede enviar { type: "SKIP_WAITING" } para forzar actualización
self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
