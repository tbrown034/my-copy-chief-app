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

// Idea: instead of pulling top articles from now, do the best from the day/week from the most popular api feed.

export const fetchMostPopular = async (numOfArticles, API_KEY) => {
  try {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/shared/7.json?api-key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.slice(0, numOfArticles);
  } catch (error) {
    console.error("Error fetching data", error);
    return []; // Return an empty array in case of an error
  }
};
