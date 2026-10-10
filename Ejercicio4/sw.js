const CACHE_NAME = "pwa-ejercicio4-app-shell-v3";
const APP_SHELL_FILES = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./img/icon-192.png",
    "./img/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const appShellUrls = APP_SHELL_FILES.map(
                (file) => new URL(file, self.registration.scope).href
            );

            await cache.addAll(appShellUrls);
            await self.skipWaiting();
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            const previousExerciseCaches = cacheNames
                .filter((cacheName) =>
                    (
                        cacheName.startsWith("pwa-ejercicio4-") ||
                        cacheName.startsWith("ejercicio4-app-shell-")
                    ) &&
                    cacheName !== CACHE_NAME
                );

            await Promise.all(
                previousExerciseCaches.map((cacheName) => caches.delete(cacheName))
            );
            await self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (
        request.method !== "GET" ||
        new URL(request.url).origin !== self.location.origin
    ) {
        return;
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(request);

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request);
        })()
    );
});
