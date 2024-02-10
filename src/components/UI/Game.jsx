import { useState, useEffect } from "react";
import { fetchMostPopular } from "../../utils/apiFetch";
import WordChoices from "../gameElements/WordChoices";
import GuessArea from "../gameElements/GuessArea";
import { shuffleArray } from "../../utils/shuffleArray";

export default function Game({ setGameDisplay, gameMode }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;
  const section = "home"; // Note: This is used for the 'latest' mode
  const [fullArticles, setFullArticles] = useState([]);
  const [processedWords, setProcessedWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [guessPlacement, setGuessPlacement] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [guessResults, setGuessResults] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [articleWins, setArticleWins] = useState(
    new Array(fullArticles.length).fill(false)
  );

  useEffect(() => {
    const loadAndProcessArticles = async () => {
      let fetchedArticles = []; // Initialize here to use later in the logic
      fetchedArticles = await fetchMostPopular(numOfNewsArticles, API_KEY);

      setFullArticles(fetchedArticles);

      let wordIdCounter = 0;
      const wordsWithIds = fetchedArticles.flatMap((article, index) =>
        article.title.split(/\s+/).map((word) => ({
          id: `${index}-${wordIdCounter++}`,
          word: word,
          articleIndex: index,
          selected: false,
        }))
      );

      const shuffledWords = shuffleArray(wordsWithIds);
      setProcessedWords(shuffledWords);
      setAvailableWords(shuffledWords);

      const initialGuessPlacement = fetchedArticles.map((article) =>
        Array(article.title.split(/\s+/).length).fill(null)
      );
      setGuessPlacement(initialGuessPlacement);
    };

    loadAndProcessArticles();
  }, [API_KEY, gameMode, numOfNewsArticles, section]);

  const handleClick = () => {
    setGameDisplay(false);
  };

  const addWordToGuess = (selectedWord) => {
    // Find the first empty position in the nested guessPlacement array
    let emptyPositionIndex = -1;
    let emptyArticleIndex = guessPlacement.findIndex(
      (articleGuesses, index) => {
        const positionIndex = articleGuesses.indexOf(null);
        if (positionIndex !== -1) {
          emptyPositionIndex = positionIndex;
          return true; // Found an article with an empty position
        }
        return false; // Continue searching
      }
    );

    if (emptyArticleIndex === -1) {
      console.log("All blanks are filled.");
      return; // Early return if all blanks are filled
    }

    // Create a new state with the selected word added
    const newGuessPlacement = guessPlacement.map((articleGuesses, index) => {
      if (index === emptyArticleIndex) {
        const newArticleGuesses = [...articleGuesses];
        newArticleGuesses[emptyPositionIndex] = selectedWord.word; // Assuming the word is a string
        return newArticleGuesses;
      }
      return articleGuesses;
    });

    setGuessPlacement(newGuessPlacement);

    // Now you need to mark the word as selected in availableWords and update the state
    const newAvailableWords = availableWords.map((word) => {
      if (word.id === selectedWord.id) {
        return { ...word, selected: true };
      }
      return word;
    });
    setAvailableWords(newAvailableWords);
  };

  const handleGuessClick = (articleIndex, wordIndex) => {
    const word = guessPlacement[articleIndex][wordIndex];

    if (selectedGuess) {
      const newGuessPlacement = [...guessPlacement];

      if (
        word !== null ||
        selectedGuess.articleIndex !== articleIndex ||
        selectedGuess.wordIndex !== wordIndex
      ) {
        const selectedWord =
          newGuessPlacement[selectedGuess.articleIndex][
            selectedGuess.wordIndex
          ];
        newGuessPlacement[selectedGuess.articleIndex][selectedGuess.wordIndex] =
          word;
        newGuessPlacement[articleIndex][wordIndex] = selectedWord;

        setSelectedGuess(null);
      } else {
        setSelectedGuess(null);
        return;
      }

      setGuessPlacement(newGuessPlacement);
    } else {
      if (word !== null) {
        setSelectedGuess({ articleIndex, wordIndex });
      }
    }
  };

  const submitGuesses = () => {
    const correctHeadlines = fullArticles.map((article) =>
      article.title.split(/\s+/)
    );
    let newArticleWins = [...articleWins];

    const newGuessResults = guessPlacement.map(
      (articleGuesses, articleIndex) => {
        let articleCorrect = true;
        const articleGuessResults = articleGuesses.map((guess, wordIndex) => {
          if (guess !== correctHeadlines[articleIndex][wordIndex]) {
            articleCorrect = false;
            return "default";
          }
          return "green";
        });

        newArticleWins[articleIndex] = articleCorrect;
        return articleGuessResults;
      }
    );

    setGuessResults(newGuessResults);
    setArticleWins(newArticleWins);
    setHasWon(newArticleWins.every((win) => win)); // Check if all articles are correctly guessed
  };

  return (
    <>
      <GuessArea
        fullArticles={fullArticles}
        guessPlacement={guessPlacement}
        setGuessPlacement={setGuessPlacement}
        setAvailableWords={setAvailableWords}
        availableWords={availableWords}
        handleGuessClick={handleGuessClick}
        selectedGuess={selectedGuess}
        submitGuesses={submitGuesses}
        guessResults={guessResults}
        setGuessResults={setGuessResults}
        hasWon={hasWon}
        setShowAnswers={setShowAnswers}
      />
      <WordChoices
        words={availableWords}
        onWordClick={addWordToGuess}
        guessPlacement={guessPlacement}
        setGuessPlacement={setGuessPlacement}
        availableWords={availableWords}
        setAvailableWords={setAvailableWords}
      />
      <div className="flex justify-center gap-2 py-8 ">
        <button
          onClick={handleClick}
          className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:active:bg-slate-400 active:bg-slate-800"
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
