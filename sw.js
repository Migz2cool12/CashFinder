const CACHE_NAME = "cashfinder-v2";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];


self.addEventListener(
  "install",
  event => {

    event.waitUntil(

      caches.open(
        CACHE_NAME
      ).then(
        cache =>
          cache.addAll(
            FILES
          )
      )

    );

    self.skipWaiting();

  }
);


self.addEventListener(
  "activate",
  event => {

    event.waitUntil(

      caches.keys().then(
        cacheNames =>

          Promise.all(

            cacheNames
              .filter(
                name =>
                  name !== CACHE_NAME
              )
              .map(
                name =>
                  caches.delete(name)
              )

          )

      )

    );

    self.clients.claim();

  }
);


self.addEventListener(
  "fetch",
  event => {

    event.respondWith(

      caches.match(
        event.request
      ).then(
        response => {

          return (
            response ||
            fetch(event.request)
          );

        }
      )

    );

  }
);
