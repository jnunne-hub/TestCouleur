const CACHE_NAME = 'disc-iota-cache-v1';
const urlsToCache = [
  '/', // Important pour l'accès racine
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/icon-192.png', // Ajoutez toutes les icônes
  '/images/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js' // Mettre en cache le CDN aussi
  // '/libs/jspdf.umd.min.js' // Ou le fichier local si vous l'utilisez
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Important: Cloner la requête. Une requête est un flux et
        // ne peut être consommée qu'une seule fois. Comme nous voulons l'utiliser à la fois par le cache et par le navigateur, nous devons la cloner.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Vérifie si nous avons reçu une réponse valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
               // Si c'est une ressource tierce (CDN) non-opaque, on ne la met pas en cache
               if (response && response.type === 'opaque') {
                    // On peut la servir, mais pas la mettre en cache nous-mêmes facilement
                    return response;
               }
               return response; // Ou gérer l'erreur différemment
            }

            // Important: Cloner la réponse. Une réponse est un flux et
            // ne peut être consommée qu'une seule fois. Nous devons la cloner pour pouvoir l'envoyer au navigateur et au cache.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Optionnel : Supprimer les anciens caches lors de l'activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Garder seulement le cache actuel
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});