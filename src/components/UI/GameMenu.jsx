// GameMenu.jsx

import React, { useState, useEffect } from "react";
import Header from "./Header";
import fetchFullArticle from "../../utilities/apiFetch.js";

export default function GameMenu() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfArticles = 2;

  useEffect(() => {
    setIsLoading(true);

    fetchFullArticle(API_KEY, numOfArticles)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [API_KEY]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section>
        {articles.map((article, index) => (
          <article key={article.url || index} className="mb-4">
            {" "}
            {/* Use URL or index as a fallback */}
            <h3 className="text-xl font-bold">{article.headline}</h3>
            <p>{article.abstract}</p>
            <small>{article.date}</small>
          </article>
        ))}
      </section>
    </div>
  );
}
