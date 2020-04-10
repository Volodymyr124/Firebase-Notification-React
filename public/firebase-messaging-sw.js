importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBASNdIOmnJVa43dgiwsPFkDGM2X2UdYWk",
    authDomain: "test-a229e.firebaseapp.com",
    databaseURL: "https://test-a229e.firebaseio.com",
    projectId: "test-a229e",
    storageBucket: "test-a229e.appspot.com",
    messagingSenderId: "198394296593",
    appId: "1:198394296593:web:5ddb600ee192ed5e74f4b0",
    measurementId: "G-03NFPSDXM0"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler( function(payLoad) {
    const title = payLoad.data.title
    const options = { body: payLoad.data.notifictiona }
    return self.ServiceWorkerRegistration.showNotification(title, options)
})