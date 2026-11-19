import fs from "node:fs/promises";
import path from "node:path";
const dir = path.resolve("mobil-demo");
const assets = await fs.readdir(path.join(dir, "assets"));
const version = assets.find((x) => x.endsWith(".js"));
const files = [
  "/mobil-demo/",
  "/mobil-demo/index.html",
  "/mobil-demo/logo.png",
  "/mobil-demo/icon.svg",
  "/mobil-demo/icon-192.png",
  "/mobil-demo/icon-512.png",
  "/mobil-demo/manifest.webmanifest",
  ...assets.map((x) => "/mobil-demo/assets/" + x),
];
await fs.writeFile(
  path.join(dir, "sw.js"),
  `const CACHE=${JSON.stringify("nexivo-mentor-" + version)};const FILES=${JSON.stringify(files)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('nexivo-mentor-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||!u.pathname.startsWith('/mobil-demo/')||e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>r.ok?r:caches.match('/mobil-demo/index.html')).catch(()=>caches.match('/mobil-demo/index.html')));return}e.respondWith(caches.match(e.request,{ignoreVary:true}).then(r=>r||fetch(e.request)))});`,
);
console.log("Scoped PWA cache generated:", files.length, "files");
