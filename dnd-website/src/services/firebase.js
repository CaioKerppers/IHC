import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDEg2WwG3w3hJt363depOi4ShAolWe_GOQ",
    authDomain: "dandd5e-2ecad.firebaseapp.com",
    projectId: "dandd5e-2ecad",
    storageBucket: "dandd5e-2ecad.firebasestorage.app",
    messagingSenderId: "396957986155",
    appId: "1:396957986155:web:b892f98d1082adcacaf02e"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc, collection, addDoc };