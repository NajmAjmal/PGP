const cacheName = 'pgpToolCache';
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

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(otherResources.map(url => new URL(url, location.href).toString()));
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
