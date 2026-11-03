const C="expenses-v1";
const FILES=["./","index.html","style.css","script.js","logo.svg","manifest.json","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&(new URL(e.request.url).origin===location.origin||/fonts\.(googleapis|gstatic)/.test(e.request.url))){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}
    return res}).catch(()=>caches.match("index.html"))));
});
