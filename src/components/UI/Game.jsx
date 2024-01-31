import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/apiFetch";
import Answers from "../gameElements/Answers";
import WordChoices from "../gameElements/WordChoices";

export default function Game({ setGameDisplay }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 10;
  const section = "home";
  const [fullArticles, setFullArticles] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchArticles(
        numOfNewsArticles,
        section,
        API_KEY
      );
      setFullArticles(fetchedArticles);
    };

    loadArticles();
  }, [API_KEY, numOfNewsArticles, section]);

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
      <WordChoices fullArticles={fullArticles} />
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
