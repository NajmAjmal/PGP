const CACHE_NAME = 'PGP-0-0-2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Cache other essential resources
            const otherResources = [
                '/',
                '/index.html',
                '/favicon.ico',
                '/najmajmal',
                '/service-worker.js',
                '/assets/css/bootstrap.css',
                '/assets/css/custom.css',
                '/assets/fonts/glyphicons-halflings-regular.woff2',
                '/assets/fonts/key_24x24.png',
                '/assets/js/bootstrap.min.js',
                '/assets/js/FileSaver.js',
                '/assets/js/jquery-3.2.1.min.js',
                '/assets/js/kbpgp.js',
                '/assets/js/pgpkeygen.js',
                '/assets/js/script.js',
            ];                    

            const resourceCachePromises = otherResources.map((resource) => {
                return cache.add(resource);
            });

            return Promise.all(resourceCachePromises);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        // Delete old caches to clean up
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If the resource is in cache, return it
            if (response) {
                return response;
            }

            // If the resource is not in cache, fetch and cache it
            return fetch(event.request).then((response) => {
                // Clone the response to cache and return it
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // If fetch fails, return a fallback response
                return caches.match('/index.html');
            });
        })
    );
});