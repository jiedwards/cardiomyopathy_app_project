import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDzQiNdBPBhsoorkAx3bdMQom4uunJY0nA",
    authDomain: "cardiomyopathy-app-da8ba.firebaseapp.com",
    projectId: "cardiomyopathy-app-da8ba",
    storageBucket: "cardiomyopathy-app-da8ba.appspot.com",
    messagingSenderId: "65807931865",
    appId: "1:65807931865:web:0e5321c40e30f8f79c61c8"
  };

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseDb = firebase.firestore();

export {firebase, firebaseAuth, firebaseDb };
