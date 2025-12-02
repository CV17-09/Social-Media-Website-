// Edder

// Use CDN ESM imports ONLY
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

//Firebase configuration from the Add App 
const firebaseConfig = {
  apiKey: "AIzaSyCk2zvghyx0D6ksfbvtmQK1c6EmhRHr0UY",
  authDomain: "social-media-website-865f5.firebaseapp.com",
  projectId: "social-media-website-865f5",
  storageBucket: "social-media-website-865f5.firebasestorage.app",
  messagingSenderId: "114991280382",
  appId: "1:114991280382:web:9cbfc29c5dcd4055c4b5af",
  measurementId: "G-944DSBRDDH"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export everything `auth.js` and script.js expect
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
