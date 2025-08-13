// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA65vc2fbYkrIF8U3CWW4MepeykXCm1m-U",
    authDomain: "e-commerce-52002.firebaseapp.com",
    projectId: "e-commerce-52002",
    storageBucket: "e-commerce-52002.firebasestorage.app",
    messagingSenderId: "827617375659",
    appId: "1:827617375659:web:1993fd2995b6c55e85ceee",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);