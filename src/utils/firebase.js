import firebase from 'firebase';

const firebaseConfig = {
    
};

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseDb = firebase.firestore();

export {firebase, firebaseAuth, firebaseDb };
