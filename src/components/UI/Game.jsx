import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/apiFetch";
import Answers from "../gameElements/Answers";

export default function Game({ setGameDisplay }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;
  const section = "home";
  const [fullArticles, setFullArticles] = useState([]); // Renamed for clarity
  const [showAnswers, setShowAnswers] = useState(false);

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

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Back to Home
      </button>
      <button
        onClick={handleShowAnswers}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Show Answers
      </button>
      {!showAnswers ? (
        ""
      ) : (
        <Answers setShowAnswers={setShowAnswers} fullArticles={fullArticles} />
      )}
    </>
  );
}
