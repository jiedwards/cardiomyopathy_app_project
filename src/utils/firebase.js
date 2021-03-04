import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDhcb1UD8VZFQwUEDa87KDUkmEB7z4fm9A",
    authDomain: "cardiomyopathy-app-e86ad.firebaseapp.com",
    projectId: "cardiomyopathy-app-e86ad",
    storageBucket: "cardiomyopathy-app-e86ad.appspot.com",
    messagingSenderId: "916215894256",
    appId: "1:916215894256:web:cf44c5add55cd396f4b235",
    measurementId: "G-6Z3S27B3LR"
};

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseDb = firebase.firestore();

export {firebase, firebaseAuth, firebaseDb };
