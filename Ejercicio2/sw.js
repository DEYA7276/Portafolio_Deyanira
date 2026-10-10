const CACHE_NAME = 'mi-app-shell-v4';
const APP_SHELL = [
  './index.html?v=2',
  './styles.css?v=2',
  './manifest.json?v=2',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('mi-app-shell-') && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((response) => {
          if (!response.ok) {
            return response;
          }
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put('./index.html?v=2', response.clone()))
            .then(() => response);
        })
        .catch(() => caches.match('./index.html?v=2'))
    );
    return;
  }

  if (APP_SHELL.some((asset) => new URL(asset, self.registration.scope).href === requestUrl.href)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) =>
        cachedResponse || fetch(request).then((response) => {
          if (!response.ok) {
            return response;
          }
          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, response.clone()))
            .then(() => response);
        })
      )
    );
  }
});
