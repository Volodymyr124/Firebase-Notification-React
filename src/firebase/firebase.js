import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

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

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;

const messaging = myFirebase.messaging();
messaging.usePublicVapidKey("BPp2jzEpRc_jl6Y7iE3mGI3mkyauHKSSZXeaXNFJgIRmMTOyC3myV2BGl0JRq69qZimDpXLaJMe-TnuyEV7ByY4");

messaging.requestPermission()
.then(function() {
  console.log('Have permission');
})
.catch(function(err) {
  console.log('Error Occured.')
})

messaging.onMessage( (payLoad) => {
  const title = payLoad.data.title
  alert(title + "\n" + payLoad.data.notifictiona)
  console.log(payLoad)
})
