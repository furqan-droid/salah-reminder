const CACHE_NAME = 'salah-reminder-v6';
const assets = ['./', './index.html', './style.css', './app.js', './prayer-times.js', './manifest.json', './icon-192.png', './icon-512.png', './reminders.json'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)).catch(() => {}));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))));
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    
    // Network-first strategy for reminders.json so remote script updates load instantly
    if (url.pathname.endsWith('.json')) {
        e.respondWith(
            fetch(e.request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                    return res;
                })
                .catch(() => caches.match(e.request))
        );
        return;
    }

    // Standard cache-first strategy for app shell
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
