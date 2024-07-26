import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, RecaptchaVerifier  } from 'firebase/auth';

/*const firebaseConfig = {
  apiKey: "AIzaSyC0hm62Hbuc7W4jr8Z_w8d99k7ErVP-YPI",
  authDomain: "travelink-f3278.firebaseapp.com",
  databaseURL: "https://travelink-f3278-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "travelink-f3278",
  storageBucket: "travelink-f3278.appspot.com",
  messagingSenderId: "720584976808",
  appId: "1:720584976808:web:ab0ab05916c83a52e6559d",
  measurementId: "G-0FDB57NK81"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyDhXNu31Mzi51CfJX_vlukehZuaQgiFz3A",
  authDomain: "travelink-74804.firebaseapp.com",
  projectId: "travelink-74804",
  storageBucket: "travelink-74804.appspot.com",
  messagingSenderId: "243031822888",
  appId: "1:243031822888:web:f72018bc3573c91a651b1d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


const TableTrips = collection(db, 'destinations');

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, googleProvider, facebookProvider, TableTrips, storage, getDocs, signInWithPhoneNumber, RecaptchaVerifier  };
