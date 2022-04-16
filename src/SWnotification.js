import { Fetch } from "./Trials/Controller";

export const notificationSubscription = async () => {
  console.log("user", localStorage.getItem("Spilleet_user"));
  const user = localStorage.getItem("Spilleet_user");

  if (!("Notification" in window)) {
    console.error("This browser does not support notifications.");
  } else if (Notification.permission === "granted") {
    if ("serviceWorker" in navigator) {
      send();
      console.log("checking serviceWorker status");
    } else {
      console.error("Service worker is not supported in this browser");
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      console.log(permission);
      if (permission === "granted" || permission === "default") {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.pushManager.getSubscription().then((sub) => {
              if (sub === undefined) {
                send().catch((err) => console.error(err));
              } else {
                localStorage.setItem(
                  "spilleet_subObj",
                  JSON.stringify({
                    usertoken: JSON.parse(user).usertoken,
                    sub: sub,
                  })
                );
                const formData = new FormData();
                formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
                formData.append("subscribe_data", JSON.stringify(sub));
                formData.append("usertoken", JSON.parse(user).usertoken);
                Fetch(
                  `${process.env.REACT_APP_END_POINT}/subscribeToPush`,
                  formData
                )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.err);
              }
            });
          });
        } else {
          console.error("Service worker is not supported in this browser");
        }
      }
    });
  }

  function send() {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        navigator.serviceWorker.ready.then((reg) => {
          console.log(reg);
          reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BFea5_DSEOa1_ZgE_rY0ckYx4FPrEY-P63AA2SmD9JH1LF6qYvxuWaZqCaj-g5LeRfjMlEb-5o1BwMyo-gtCFfE"
              ),
            })
            .then((subscriptionObject) => {
              console.log(subscriptionObject);
              // localStorage.setItem("spilleet_subObj", JSON.stringify(subscriptionObject));
              localStorage.setItem(
                "spilleet_subObj",
                JSON.stringify({
                  usertoken: JSON.parse(user).usertoken,
                  sub: subscriptionObject,
                })
              );
              const formData = new FormData();
              formData.append("apptoken", process.env.REACT_APP_APP_TOKEN);
              formData.append(
                "subscribe_data",
                JSON.stringify(subscriptionObject)
              );
              formData.append("usertoken", JSON.parse(user).usertoken);

              Fetch(
                `${process.env.REACT_APP_END_POINT}/subscribeToPush`,
                formData
              )
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.err);
            });
        });
      });
  }

  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
};
