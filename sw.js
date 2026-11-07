// Bedside Ref offline support. Changing VERSION is what tells installed copies to fetch the new book.
const VERSION = '2026-11-07.1835';
const CACHE = 'bedside-ref-' + VERSION;
const FILES = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "icon-192.png",
 "icon-512.png",
 "apple-touch-icon.png",
 "favicon-32.png",
 "fonts/caveat-latin-600-normal.woff2",
 "fonts/caveat-latin-700-normal.woff2",
 "fonts/caveat-latin-ext-600-normal.woff2",
 "fonts/caveat-latin-ext-700-normal.woff2",
 "fonts/fredoka-latin-500-normal.woff2",
 "fonts/fredoka-latin-600-normal.woff2",
 "fonts/fredoka-latin-700-normal.woff2",
 "fonts/fredoka-latin-ext-500-normal.woff2",
 "fonts/fredoka-latin-ext-600-normal.woff2",
 "fonts/fredoka-latin-ext-700-normal.woff2",
 "fonts/nunito-latin-400-italic.woff2",
 "fonts/nunito-latin-400-normal.woff2",
 "fonts/nunito-latin-700-italic.woff2",
 "fonts/nunito-latin-700-normal.woff2",
 "fonts/nunito-latin-800-italic.woff2",
 "fonts/nunito-latin-800-normal.woff2",
 "fonts/nunito-latin-ext-400-italic.woff2",
 "fonts/nunito-latin-ext-400-normal.woff2",
 "fonts/nunito-latin-ext-700-italic.woff2",
 "fonts/nunito-latin-ext-700-normal.woff2",
 "fonts/nunito-latin-ext-800-italic.woff2",
 "fonts/nunito-latin-ext-800-normal.woff2",
 "img/aorta.jpg",
 "img/ards.jpg",
 "img/armarteries.jpg",
 "img/chesttube.jpg",
 "img/cvc.jpg",
 "img/effusion.jpg",
 "img/ett.jpg",
 "img/hdcath.jpg",
 "img/icuroom.jpg",
 "img/mi.jpg",
 "img/nephron.jpg",
 "img/neurogenic.jpg",
 "img/picc.jpg",
 "img/port.jpg",
 "img/pressure.jpg",
 "img/stroke.jpg",
 "img/tamponade.jpg",
 "img/team.jpg",
 "img/trach.jpg",
 "img/ventilator.jpg",
 "img/ventricles.jpg"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('bedside-ref-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', (e) => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./index.html', { cacheName: CACHE }).then((r) => r || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req, { cacheName: CACHE, ignoreSearch: true }).then((r) => r || fetch(req)));
});
