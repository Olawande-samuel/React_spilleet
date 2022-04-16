/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  console.log("log",event.data.json())
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
