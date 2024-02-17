// Assumes this file is located under src/utils/ or a similar directory

export const fetchMostPopular = async (numOfArticles) => {
  // Dynamically determine API base URL based on environment
  const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL // Use production backend URL if in production
    : "http://localhost:3000"; // Use local server for development

  try {
    const response = await fetch(
      `${API_BASE_URL}/articles?num=${numOfArticles}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return fetched data
  } catch (error) {
    console.error("Error fetching data", error);
    return []; // Return empty array in case of error
  }
};
