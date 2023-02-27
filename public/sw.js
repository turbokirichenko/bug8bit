import { version } from "../package.json";
const cacheName = "bug8bit-cache";
const filesToCache = [
  '/',
  'index.html',
  `index.${version}.css`,
  `index.${version}.js`,
  'manifest.json',
  'bg-texture-wood.jpg',
  'bug-icon.svg',
  'normals-map/bg-texture-wood-normal.jpg',
  'bug-brown-4.json',
  'bug-brown-4.png',
  'normals-map/bug-brown-normal-4.json',
  'normals-map/bug-brown-normal-4.png',
  'bug-red-4.json',
  'bug-red-4.png',
  'normals-map/bug-red-normal-4 .json',
  'normals-map/bug-red-normal-4 .png',
  'bug-green-4.json',
  'bug-green-4.png',
  'normals-map/bug-green-normal-4.json',
  'normals-map/bug-green-normal-4.png',
  'bug-red-destroy-1.json',
  'bug-red-destroy-1.png',
  'normals-map/bug-destroy-normal-1.json',
  'normals-map/bug-destroy-normal-1.png',
  'ouch.json',
  'ouch.png',
  'poof.json',
  'poof.png',
  'Bug8bit.png',
  'sound/ben.mp3',
  'sound/poop-effect.mp3',
  'fonts/PixeloidMono.ttf',
  'undo.png'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });