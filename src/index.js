import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter } from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// if (!("Notification" in window)) {
//   console.error("This browser does not support notifications.");
// }

// // Let's check whether notification permissions have already been granted
// else if (Notification.permission === "granted") {
//   console.log("Permission to receive notifications has been granted");
// }

// // Otherwise, we need to ask the user for permission
// else if (Notification.permission !== 'denied') {
//   Notification.requestPermission(function (permission) {
//     // If the user accepts, let's create a notification
//     if (Notification.permission === 'granted') {
//       navigator.serviceWorker.getRegistration().then(function(reg) {
//         reg.showNotification('Hello world!');
//       });
//     }
//   });
// }
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register('/service-worker.js')
//   .then(function(reg) {
//      console.log('Service worker change, registered the service worker');
//   });
// }
// // Otherwise, no push notifications :(
// else {
//   console.error('Service worker is not supported in this browser');
// }
// function saveSubscriptionToDatabase(){
//   navigator.serviceWorker.ready
//   .then((serviceWorkerRegistration) => {
//     console.log(serviceWorkerRegistration.pushManager.getSubscription());
//     serviceWorkerRegistration.pushManager.getSubscription()
//     .then((subscription) => {
//      console.log(subscription)
//     });
//   });

// }




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
