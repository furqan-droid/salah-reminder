const CACHE_NAME = 'salah-reminder-v6';
const assets = ['./', './index.html', './style.css', './app.js', './prayer-times.js', './manifest.json', './icon-192.png', './icon-512.png'];

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
    
    // For dynamic remote scripts (reminders.json), try network first, fall back to cache
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
```[cite: 16]

#### Optimized `manifest.json` (Subpath Corrected)
```json
{
  "name": "نماز یاد دہانی - Salah Reminder",
  "short_name": "Salah Reminder",
  "description": "Personal prayer reminder app",
  "start_url": "/salah-reminder/",
  "scope": "/salah-reminder/",
  "display": "standalone",
  "background_color": "#1a472a",
  "theme_color": "#1a472a",
  "orientation": "portrait",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```[cite: 12]
