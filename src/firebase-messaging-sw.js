importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX",
  appId: "XXX",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages (when the app is not focused)
messaging.onBackgroundMessage((payload) => {
  console.log("Message received in the background:", JSON.stringify(payload));

  // You can perform background tasks here, like showing notifications
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      console.log("clients count", clients.length);
      clients.forEach((client) => {
        client.postMessage({
          type: "FCM_BACKGROUND_MESSAGE",
          payload: payload,
        });
      });
    });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
