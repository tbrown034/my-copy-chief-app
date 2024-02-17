//frontend React component or a utility file
// util/apiFetch.js
export const fetchMostPopular = async (numOfArticles) => {
  const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3000";

  try {
    const response = await fetch(
      `${API_BASE_URL}/articles?num=${numOfArticles}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
