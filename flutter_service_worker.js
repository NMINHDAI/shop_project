'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "b51bf7a760a80a83ec6ac8bb08a85687",
"assets/assets/icons/ic_bag.png": "cb3d3614f314769568bf25eddb80ad4e",
"assets/assets/icons/ic_decor.png": "10dd0e8a6d767f371278cbf6e412748e",
"assets/assets/icons/ic_kids.png": "e385a89fd62db0f8dbf601d1ace23c13",
"assets/assets/icons/ic_men.png": "3efa86267b7da64920c37ff390033eca",
"assets/assets/icons/ic_sports.png": "3e7e3cd296c5bc31b3477849cced45c4",
"assets/assets/icons/ic_woman.png": "c9534290f6be103f8e45b6b5e71d9584",
"assets/assets/icons/settings.png": "3df07319a3cf58770a0c4f813995170f",
"assets/assets/icons/user.png": "297c9f6b5bdc9f3310395bcef59db451",
"assets/assets/images/bg.jpeg": "c6449162dc3940daa640a43101cfd66c",
"assets/assets/images/bg_bottom_bar.png": "dd4c8dd70d6e0f52f9b01d06fd707c57",
"assets/assets/images/IMG_7344.jpg": "39bc15a973572b3adadcea4359423778",
"assets/assets/products/bag_brwon.jpeg": "864a810a32964cece0b8f6e68bdcbc66",
"assets/assets/products/bag_silver.jpeg": "e471df33a029968b88b2a1f18cc2f907",
"assets/assets/products/banners/b1.jpg": "3bc9c175259d66aafe8b9606cc668974",
"assets/assets/products/banners/b2.jpg": "a3ca9842ec04de73135d5da944c9fa06",
"assets/assets/products/banners/b3.jpg": "47a0af67263cca3ab917bf5d7d6bee2b",
"assets/assets/products/banners/b4.jpg": "69336306b06d8b77e398f2a7e2d700f9",
"assets/assets/products/banners/b5.jpg": "a7b21e59493d87a84891c0f0cb1594ea",
"assets/assets/products/banners/b6.jpg": "d2ed24f842ee6fddb61723af3a7794b2",
"assets/assets/products/dress/dress_1.jpeg": "d88aa38304be882cd2b215a5b68be9d6",
"assets/assets/products/dress/dress_2.jpeg": "738298244324a205d8bf86f6f86545e5",
"assets/assets/products/dress/dress_3.jpeg": "be2c3a58b0a60bf3b2778a03629b06d9",
"assets/assets/products/dress/dress_6.jpeg": "ee8e8866d0f150299a35c8269de3e9aa",
"assets/assets/products/dress/dress_8.jpeg": "1d58060c09bdc2670ff8a8d1940e3500",
"assets/assets/products/idalia.webp": "aa64fe553e5e7e7e681acc9dd1396953",
"assets/assets/products/roadstar.webp": "a07907d365c0aefeae68d3d095ff7367",
"assets/assets/products/shoes.jpeg": "d276aef86b8bbf30bf49f8cb2ff193e4",
"assets/assets/products/spects.jpg": "ac245a48a9733d47b731d0be424193be",
"assets/assets/products/vamsi.webp": "18c392069ce521156ec72a05b3971307",
"assets/assets/products/watch_1.jpg": "1a6568ed7bc762043ce2ddb9c3af04d9",
"assets/assets/products/watch_2.jpeg": "dfe192ce7743546fe1c076c398678855",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "06a077f1071fa294e68da25efb986700",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "2c89e76ca4357829a957e3d55514adcd",
"/": "2c89e76ca4357829a957e3d55514adcd",
"main.dart.js": "06638f8d7c8774336d653da02bf0cc0a",
"manifest.json": "73717bb283c7c859c8060dbfe5d1573c",
"version.json": "4f30e62127ffda033ea070635f7a64a1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
