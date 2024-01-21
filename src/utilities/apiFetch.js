const fetchFullArticle = async (API_KEY, numOfNewsArticles) => {
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results.slice(0, numOfNewsArticles).map((article) => ({
    headline: article.title,
    abstract: article.abstract,
    date: article.published_date,
  }));
};

export default fetchFullArticle;
