// src/config/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBkIS0wokIeVnYtBBOjJ6ocAAdPj-ddILI",
  // authDomain: "copychief-cf54b.firebaseapp.com",
  // projectId: "copychief-cf54b",
  // storageBucket: "copychief-cf54b.appspot.com",
  // messagingSenderId: "387942657017",
  // appId: "1:387942657017:web:7c903e84eda78f45c86b28",
  // measurementId: "G-R90RLS2SM7",
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
