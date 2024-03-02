// fetchEarlyHeadlines.js
import fetch from "node-fetch";
import { doc, setDoc } from "firebase/firestore";
import { db } from "/src/config/Firebase.jsx"; // Adjust this to the correct path of your Firebase config

const API_KEY = process.env.NYT_API_KEY;
const NYT_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

async function fetchAndStoreHeadlines() {
  try {
    const response = await fetch(NYT_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    const docRef = doc(db, "dailyPuzzles", today);

    // Store the fetched articles in Firestore
    await setDoc(docRef, { articles: data.results });
    console.log(`Headlines fetched and stored for ${today}`);
  } catch (error) {
    console.error("Error fetching and storing headlines:", error);
  }
}

fetchAndStoreHeadlines();
