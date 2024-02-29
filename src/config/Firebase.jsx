// src/config/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBkIS0wokIeVnYtBBOjJ6ocAAdPj-ddILI",
  authDomain: "copychief-cf54b.firebaseapp.com",
  projectId: "copychief-cf54b",
  storageBucket: "copychief-cf54b.appspot.com",
  messagingSenderId: "387942657017",
  appId: "1:387942657017:web:7c903e84eda78f45c86b28",
  measurementId: "G-R90RLS2SM7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db };
