const CACHE_NAME = "point-bank-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];


// インストール
self.addEventListener("install", event => {

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );

  self.skipWaiting();

});


// 古いキャッシュを削除
self.addEventListener("activate", event => {

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames
            .filter(name => {
              return name !== CACHE_NAME;
            })
            .map(name => {
              return caches.delete(name);
            })

        );

      })
  );

  self.clients.claim();

});


// 通信できなければキャッシュを使用
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    fetch(event.request)

      .then(response => {

        const copy = response.clone();

        caches
          .open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, copy);
          });

        return response;

      })

      .catch(() => {

        return caches.match(event.request);

      })

  );

});