// ========================================
// CONFIGURACIÓN
// ========================================

const CACHE_NAME = 'ejercicio3-pwa-v1';

const ARCHIVOS_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js'
];


// ========================================
// INSTALACIÓN
// ========================================

self.addEventListener('install', event => {

    console.log('Service Worker: instalando');

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                console.log('Service Worker: guardando archivos');

                return cache.addAll(ARCHIVOS_CACHE);

            })

    );

    self.skipWaiting();

});


// ========================================
// ACTIVACIÓN
// ========================================

self.addEventListener('activate', event => {

    console.log('Service Worker: activando');

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== CACHE_NAME;
                        })
                        .map(cacheName => {

                            console.log(
                                'Eliminando caché antigua:',
                                cacheName
                            );

                            return caches.delete(cacheName);

                        })

                );

            })

    );

    self.clients.claim();

});


// ========================================
// PETICIONES
// ========================================

self.addEventListener('fetch', event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                // Si existe en caché
                if (response) {

                    console.log(
                        'Recurso obtenido desde caché:',
                        event.request.url
                    );

                    return response;

                }


                // Si no existe, buscar en Internet
                return fetch(event.request)

                    .then(networkResponse => {

                        return caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    networkResponse.clone()
                                );

                                return networkResponse;

                            });

                    });

            })

            .catch(() => {

                console.log(
                    'Sin conexión. Usando contenido almacenado.'
                );

                return caches.match('./index.html');

            })

    );

});
