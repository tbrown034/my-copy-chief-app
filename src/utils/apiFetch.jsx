export const fetchArticles = async (numOfArticles, section, API_KEY) => {
  try {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, numOfArticles);
  } catch (error) {
    console.error("Error fetching data", error);
    return []; // Return an empty array in case of an error
  }
};
