import { doc, getDoc, setDoc } from "firebase/firestore";

// This function seems to be intended for frontend use. Ensure it's correctly implemented
// to make requests to your backend which then queries the NYT API.
export const fetchMostPopular = async (numOfArticles = 2, duration = 1) => {
  const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_PRO_URL // Use production URL
    : import.meta.env.VITE_BACKEND_DEV_URL; // Use development URL
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles?num=${numOfArticles}&duration=${duration}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
};

const playDailyGame = async () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const docRef = doc(db, "dailyPuzzles", today);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(
        "Daily puzzle already exists. Playing with existing puzzle:",
        docSnap.data()
      );
      // Set up to use the existing puzzle
      setGameDisplay(true);
      setIsDailyGame(true);
    } else {
      console.log(
        "No daily puzzle found for today. Fetching and storing new puzzle."
      );
      const articles = await fetchMostPopular(2, 1); // Defaults to medium difficulty (2 headlines) and 1 day
      if (articles.length > 0) {
        // Store the fetched articles in Firestore
        await setDoc(docRef, { articles });
        console.log("New daily puzzle stored in Firestore.");
        setGameDisplay(true);
        setIsDailyGame(true);
        // Optionally, set up the game with the newly fetched articles
      } else {
        console.error("Failed to fetch or store daily puzzle.");
      }
    }
  } catch (error) {
    console.error("Error handling daily puzzle:", error);
  }
};
