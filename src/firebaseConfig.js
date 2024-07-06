// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhXNu31Mzi51CfJX_vlukehZuaQgiFz3A",
  authDomain: "travelink-74804.firebaseapp.com",
  projectId: "travelink-74804",
  storageBucket: "travelink-74804.appspot.com",
  messagingSenderId: "243031822888",
  appId: "1:243031822888:web:f72018bc3573c91a651b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
