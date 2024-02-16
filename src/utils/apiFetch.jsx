export const fetchMostPopular = async (numOfArticles, API_KEY) => {
  try {
    // Update the URL to fetch the most popular articles from the past day
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Slice the results to get the number of articles you want
    return data.results.slice(0, numOfArticles);
  } catch (error) {
    console.error("Error fetching data", error);
    return []; // Return an empty array in case of an error
  }
};
