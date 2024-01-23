import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/apiFetch";
import Answers from "../gameElements/Answers";

export default function Game({ setGameDisplay }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;
  const section = "home";
  const [fullArticles, setFullArticles] = useState([]); // Renamed for clarity

  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchArticles(
        numOfNewsArticles,
        section,
        API_KEY
      );
      setFullArticles(fetchedArticles); // Now using the correct state setter
    };

    loadArticles();
  }, [API_KEY, numOfNewsArticles, section]); // Added dependencies

  const handleClick = () => {
    setGameDisplay(false);
  };

  return (
    <>
      <div>Game</div>
      <ul>
        {fullArticles.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            {/* Add more details as needed, like article.abstract */}
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Back to Home
      </button>
      <Answers fullArticles={fullArticles} />
    </>
  );
}
