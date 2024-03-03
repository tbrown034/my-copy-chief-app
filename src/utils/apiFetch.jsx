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
