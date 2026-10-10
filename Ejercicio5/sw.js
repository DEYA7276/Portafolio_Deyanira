const CACHE_NAME = "ejercicio5-app-shell-v1";
const APP_SHELL = [
  "./index.html",
  "./offline.html",
  "./styles.css",
  "./app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("ejercicio5-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            if (request.mode === "navigate" && !response.ok) {
              return caches.match("./offline.html").then((offlinePage) => {
                if (offlinePage) {
                  return offlinePage;
                }
                return response;
              });
            }
            return response;
          })
          .catch((error) => {
            if (request.mode === "navigate") {
              return caches.match("./offline.html").then((offlinePage) => {
                if (offlinePage) {
                  return offlinePage;
                }
                throw error;
              });
            }

            return new Response("Recurso no disponible sin conexión.", {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain; charset=utf-8" }
            });
          });
      })
  );
});
