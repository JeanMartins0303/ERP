// Service Worker para Dashboard ERP
const CACHE_NAME = 'erp-dashboard-v1.0';
const urlsToCache = [
    '/',
    '/dashboard.html',
    '/css/base.css',
    '/js/main.js',
    '/img/logo.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache se disponível
                if (response) {
                    return response;
                }
                
                // Se não estiver no cache, busca da rede
                return fetch(event.request)
                    .then(response => {
                        // Verifica se a resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clona a resposta para armazenar no cache
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Fallback para páginas offline
                        if (event.request.destination === 'document') {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Sincronização em background
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Sincronizar dados quando conexão for restaurada
    return fetch('/api/sync', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: Date.now(),
            action: 'sync'
        })
    }).catch(error => {
        console.log('Erro na sincronização:', error);
    });
}

// Notificações push
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nova atualização disponível!',
        icon: '/img/logo.png',
        badge: '/img/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver Dashboard',
                icon: '/img/checkmark.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/img/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('ERP Dashboard', options)
    );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/dashboard.html')
        );
    }
}); 