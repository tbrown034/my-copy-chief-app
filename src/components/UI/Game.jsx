import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/apiFetch";
import Answers from "../gameElements/Answers";
import WordChoices from "../gameElements/WordChoices";
import GuessArea from "../gameElements/GuessArea";
import { shuffleArray } from "../../utils/shuffleArray";

export default function Game({ setGameDisplay }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
  const numOfNewsArticles = 2;
  const section = "home";
  const [fullArticles, setFullArticles] = useState([]);
  const [processedWords, setProcessedWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [guessPlacement, setGuessPlacement] = useState(
    fullArticles.map((article) =>
      Array(article.title.split(/\s+/).length).fill(null)
    )
  );
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedGuess, setSelectedGuess] = useState(null); // null initially
  const [swapMoveCount, setSwapMoveCount] = useState(0);
  const [guessResults, setGuessResults] = useState([]);
  const [hasWon, setHasWon] = useState(false);

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

      // Initialize guessPlacement with nulls for each word in each headline
      const initialGuessPlacement = fetchedArticles.map((article) =>
        Array(article.title.split(/\s+/).length).fill(null)
      );
      setGuessPlacement(initialGuessPlacement);
    };

    loadAndProcessArticles();
  }, [API_KEY, numOfNewsArticles, section]);

  const handleClick = () => {
    setGameDisplay(false);
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
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

    // If there is a selected guess, handle the swap or move.
    if (selectedGuess) {
      const newGuessPlacement = [...guessPlacement];

      // Determine if the current click is for a swap or to move into an empty spot.
      if (
        word !== null ||
        selectedGuess.articleIndex !== articleIndex ||
        selectedGuess.wordIndex !== wordIndex
      ) {
        // Perform the swap or move.
        const selectedWord =
          newGuessPlacement[selectedGuess.articleIndex][
            selectedGuess.wordIndex
          ];
        newGuessPlacement[selectedGuess.articleIndex][selectedGuess.wordIndex] =
          word; // This could be null if moving to an empty spot.
        newGuessPlacement[articleIndex][wordIndex] = selectedWord;

        // After the swap, reset the selected guess.
        setSelectedGuess(null);
      } else {
        // If the selected guess is clicked again, deselect it.
        setSelectedGuess(null);
        return;
      }

      // Update the guess placements after the swap or move.
      setGuessPlacement(newGuessPlacement);

      // Optionally, update any related state like guess results or move counters here.
      // For example, resetting guess results or incrementing a move counter if you're tracking moves.
    } else {
      // If no guess is currently selected and the spot clicked is not empty, select the word.
      if (word !== null) {
        setSelectedGuess({ articleIndex, wordIndex });
      }
      // If the spot is empty, do nothing (prevent selecting an empty spot).
    }
  };

  const submitGuesses = () => {
    const correctHeadlines = fullArticles.map((article) =>
      article.title.split(/\s+/)
    );
    let win = true; // Assume win until proven otherwise

    const newGuessResults = guessPlacement.map((articleGuesses, articleIndex) =>
      articleGuesses.map((guess, wordIndex) => {
        if (guess === correctHeadlines[articleIndex][wordIndex]) {
          return "green"; // Correct guess
        } else {
          win = false; // Any incorrect guess negates the win
          const correctArticleIndex = correctHeadlines.findIndex((headline) =>
            headline.includes(guess)
          );
          if (
            correctArticleIndex !== -1 &&
            correctHeadlines[correctArticleIndex][wordIndex] === guess
          ) {
            return "yellow"; // Right word, wrong headline
          }
          return "default"; // Incorrect guess
        }
      })
    );

    setGuessResults(newGuessResults);
    setHasWon(win);
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
      />
      <div className="swap-move-counter">Swaps/Moves: {swapMoveCount}</div>
      <WordChoices words={availableWords} onWordClick={addWordToGuess} />
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
