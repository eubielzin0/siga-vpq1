/* SIGA · VPQ — service worker (v2)
   Estratégia: rede primeiro, cache como reserva offline.
   Assim toda atualização do app chega aos auditores sem travar em versão antiga.
   Os dados de coleta ficam no localStorage/Supabase — NUNCA neste cache. */
const CACHE = "siga-vpq-v6";
const ASSETS = ["./","./index.html","./manifest.webmanifest",
  "./icon-192.png","./icon-512.png","./apple-touch-icon.png","./favicon.png",
  "./mark-mono.png","./mark-siga.png","./mark-vpq.png",
  "./logo-viaparque.png","./logo-alqia.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // Supabase/CDN passam direto

  const isShell = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("index.html");

  if (isShell) {                                      // app: rede primeiro
    e.respondWith(
      fetch(req)
        .then(resp => { const c = resp.clone(); caches.open(CACHE).then(x => x.put(req, c)); return resp; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }
  e.respondWith(                                      // ícones: cache primeiro
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      if (resp && resp.status === 200) { const c = resp.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return resp;
    }).catch(() => cached))
  );
});
