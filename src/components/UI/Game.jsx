import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/apiFetch";
import Answers from "../gameElements/Answers";
import WordChoices from "../gameElements/WordChoices";
import GuessArea from "../gameElements/GuessArea";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Game({ setGameDisplay }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;
  const section = "home";
  const [fullArticles, setFullArticles] = useState([]);
  const [processedWords, setProcessedWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [guessPlacement, setGuessPlacement] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);

  useEffect(() => {
    const loadAndProcessArticles = async () => {
      const fetchedArticles = await fetchArticles(
        numOfNewsArticles,
        section,
        API_KEY
      );
      setFullArticles(fetchedArticles);

      let wordIdCounter = 0;
      const wordsWithIds = fetchedArticles.flatMap((article, index) =>
        article.title.split(/\s+/).map((word) => ({
          id: `${index}-${wordIdCounter++}`, // Unique ID for each word
          word: word,
          articleIndex: index, // Keep track of which article the word belongs to
          selected: false, // Initial selected state is false
        }))
      );

      // Shuffle and set the processed words
      const shuffledWords = shuffleArray(wordsWithIds);
      setProcessedWords(shuffledWords);
      setAvailableWords(shuffledWords);

      // Initialize guessPlacement with the correct number of blanks for each article
    };

    loadAndProcessArticles();
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
      <GuessArea fullArticles={fullArticles} guessPlacement={guessPlacement} />
      <WordChoices words={availableWords} />
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
