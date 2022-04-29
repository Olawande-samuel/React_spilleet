/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  console.log("log",event.data.json())
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});


self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});