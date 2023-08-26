import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-1DwsiazXF20wFksoVYAN2_9xg9FNX7Y",
  authDomain: "richpanel-254ad.firebaseapp.com",
  projectId: "richpanel-254ad",
  storageBucket: "richpanel-254ad.appspot.com",
  messagingSenderId: "864547517383",
  appId: "1:864547517383:web:b0461dc0979f6eb2379fe2",
  measurementId: "G-XHT8NG4R6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export let auth = getAuth(app);
export const provider = new GoogleAuthProvider();
