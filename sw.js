// Bedside Ref offline support. Changing VERSION is what tells installed copies to fetch the new book.
const VERSION = '2026-11-09.1454';
const CACHE = 'bedside-ref-' + VERSION;
const FILES = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "icon-192.png",
 "icon-512.png",
 "apple-touch-icon.png",
 "favicon-32.png",
 "atkinson-hyperlegible-latin-400-italic.woff2",
 "atkinson-hyperlegible-latin-400-normal.woff2",
 "atkinson-hyperlegible-latin-700-italic.woff2",
 "atkinson-hyperlegible-latin-700-normal.woff2",
 "caveat-latin-600-normal.woff2",
 "caveat-latin-700-normal.woff2",
 "caveat-latin-ext-600-normal.woff2",
 "caveat-latin-ext-700-normal.woff2",
 "fredoka-latin-500-normal.woff2",
 "fredoka-latin-600-normal.woff2",
 "fredoka-latin-700-normal.woff2",
 "fredoka-latin-ext-500-normal.woff2",
 "fredoka-latin-ext-600-normal.woff2",
 "fredoka-latin-ext-700-normal.woff2",
 "literata-latin-400-italic.woff2",
 "literata-latin-400-normal.woff2",
 "literata-latin-700-italic.woff2",
 "literata-latin-700-normal.woff2",
 "nunito-latin-400-italic.woff2",
 "nunito-latin-400-normal.woff2",
 "nunito-latin-700-italic.woff2",
 "nunito-latin-700-normal.woff2",
 "nunito-latin-800-italic.woff2",
 "nunito-latin-800-normal.woff2",
 "nunito-latin-ext-400-italic.woff2",
 "nunito-latin-ext-400-normal.woff2",
 "nunito-latin-ext-700-italic.woff2",
 "nunito-latin-ext-700-normal.woff2",
 "nunito-latin-ext-800-italic.woff2",
 "nunito-latin-ext-800-normal.woff2",
 "opendyslexic-latin-400-italic.woff2",
 "opendyslexic-latin-400-normal.woff2",
 "opendyslexic-latin-700-italic.woff2",
 "opendyslexic-latin-700-normal.woff2",
 "aorta.jpg",
 "ards.jpg",
 "armarteries.jpg",
 "chesttube.jpg",
 "cvc.jpg",
 "effusion.jpg",
 "ett.jpg",
 "hdcath.jpg",
 "icuroom.jpg",
 "mi.jpg",
 "nephron.jpg",
 "neurogenic.jpg",
 "picc.jpg",
 "port.jpg",
 "pressure.jpg",
 "stroke.jpg",
 "tamponade.jpg",
 "team.jpg",
 "trach.jpg",
 "ventilator.jpg",
 "ventricles.jpg"
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
  // The page itself: newest copy when online (so updates show on the next open), saved copy when offline.
  if (req.mode === 'navigate' || /\/index\.html$/.test(new URL(req.url).pathname)) {
    e.respondWith((async () => {
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
        const net = await fetch(req.url.split('#')[0], { cache: 'no-cache', signal: ctl.signal }); clearTimeout(t);
        if (net.ok) { const c = await caches.open(CACHE); c.put('./index.html', net.clone()); return net; }
        throw new Error('status ' + net.status);
      } catch (err) {
        return (await caches.match('./index.html', { cacheName: CACHE })) || fetch(req);
      }
    })());
    return;
  }
  e.respondWith(caches.match(req, { cacheName: CACHE, ignoreSearch: true }).then((r) => r || fetch(req)));
});
