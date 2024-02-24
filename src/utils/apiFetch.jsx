export const fetchMostPopular = async (numOfArticles, duration = 1) => {
  const API_BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_PRO_URL // Updated to use the correct environment variable
    : import.meta.env.VITE_BACKEND_DEV_URL; // Ensure this is correctly defined for development
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
    return [];
  }
};
