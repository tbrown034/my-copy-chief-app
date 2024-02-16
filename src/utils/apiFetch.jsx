// Assuming this function is in your frontend React component or a utility file

// util/apiFetch
export const fetchMostPopular = async (numOfArticles) => {
  try {
    // Make a request to your backend endpoint
    const response = await fetch(
      `http://localhost:3000/articles?num=${numOfArticles}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // This should be the sliced array of articles returned by your backend
  } catch (error) {
    console.error("Error fetching data", error);
    return []; // Return an empty array in case of an error
  }
};
