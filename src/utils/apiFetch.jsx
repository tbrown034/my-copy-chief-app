export const fetchMostPopular = async (numOfArticles, API_KEY) => {
  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, numOfArticles);
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};
