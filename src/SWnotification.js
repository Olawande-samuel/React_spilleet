import { Fetch } from "./Trials/Controller";

export const notificationSubscription = async () => {
  const user = localStorage.getItem("Spilleet_user");
  if ("serviceWorker" in navigator) {
    send();
  } else {
    console.error("Service worker is not supported in this browser");
  }

  function send() {  
    console.log("registering new")
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        navigator.serviceWorker.ready
          .then(async (reg) => {
            // update existing registration if it differs from the new on
            await registration.update();    
            console.log("subscribing...")

              reg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    "BFea5_DSEOa1_ZgE_rY0ckYx4FPrEY-P63AA2SmD9JH1LF6qYvxuWaZqCaj-g5LeRfjMlEb-5o1BwMyo-gtCFfE"
                  ),
                })
                .then((subscriptionObject) => {
                  console.log(subscriptionObject);
                  localStorage.setItem(
                    "spilleet_subObj",
                    JSON.stringify({
                      usertoken: JSON.parse(user).usertoken,
                      sub: subscriptionObject,
                    })
                  );
                  localStorage.setItem("spilleet_anchor", "e%aZ51L[Kxpm,u<");

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
                })
                .catch((err) =>
                  console.log("push manager subscription error " + err)
                );
          })
          .catch((err) => console.log('service worker ready check error ' + err));
      })
      .catch((err) => {
        console.log("Registration failed with " + err);
      });
  }
};
export function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
