// // scheduled_tasks/fetchAndStoreHeadlines.js
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../src/config/Firebase.js"; // Ensure this path correctly points to your Firebase config file

// dotenv.config();

// const API_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.VITE_BACKEND_PRO_URL
//     : process.env.VITE_BACKEND_DEV_URL;

// async function fetchMostPopular(numOfArticles = 2, duration = 1) {
//   const response = await fetch(
//     `${API_BASE_URL}/articles?num=${numOfArticles}&duration=${duration}`
//   );
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   return response.json();
// }

// async function storeHeadlinesInDb(articles, documentId) {
//   const docRef = doc(db, "dailyPuzzles", documentId);
//   await setDoc(docRef, { articles, createdAt: serverTimestamp() });
// }

// async function fetchAndStoreHeadlines() {
//   const now = new Date();
//   const date = now.toISOString().split("T")[0];
//   const edition = now.getHours() < 12 ? "Early Edition" : "Late Edition";
//   const documentId = `${date} (${edition})`;

//   try {
//     const docRef = doc(db, "dailyPuzzles", documentId);
//     const docSnap = await getDoc(docRef);

//     if (!docSnap.exists()) {
//       console.log("Fetching new puzzle from backend.");
//       const data = await fetchMostPopular();
//       if (data && data.length > 0) {
//         await storeHeadlinesInDb(data, documentId);
//         console.log("New daily puzzle stored in Firestore.");
//       } else {
//         console.error("No articles were fetched from the backend.");
//       }
//     } else {
//       console.log("Puzzle already exists for this edition.");
//     }
//   } catch (error) {
//     console.error("Error in scheduled task:", error);
//   }
// }

// fetchAndStoreHeadlines();
