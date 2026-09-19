// Bump CACHE whenever you change index.html, so phones pick up the new version.
const CACHE = 'soccer-minutes-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from cache first so the app opens instantly with no signal at all,
// then refresh the cache in the background. A new version appears next launch.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const FONTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
  if (url.origin !== self.location.origin) {
    // Cache the webfonts so the app looks the same with no signal.
    // Everything else cross-origin (season files from GitHub) must stay live.
    if (!FONTS.includes(url.hostname)) return;
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(hit => {
      const net = fetch(e.request).then(res => {
        if (res && res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
