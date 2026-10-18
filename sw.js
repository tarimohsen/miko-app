const C='miko-v12',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
const put=(r,x)=>{if(x&&x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url);
if(u.origin==location.origin)e.respondWith(fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r)));
else if(/(^|\.)gstatic\.com$|fonts\.googleapis\.com$/.test(u.hostname))e.respondWith(caches.match(r).then(c=>c||fetch(r).then(x=>put(r,x))))});
