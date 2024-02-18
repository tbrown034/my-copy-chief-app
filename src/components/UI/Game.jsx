//game.jsx

import { useState, useEffect } from "react";
import { fetchMostPopular } from "../../utils/apiFetch";
import WordChoices from "../gameElements/WordChoices";
import GuessArea from "../gameElements/GuessArea";
import { shuffleArray } from "../../utils/shuffleArray";
import WinDisplay from "../gameElements/WinDisplay";

export default function Game({ setGameDisplay, numOfHeadlines }) {
  const API_KEY = import.meta.env.VITE_NYT_API_KEY;
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
      fetchedArticles = await fetchMostPopular(numOfHeadlines);

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
      setArticleWins(new Array(fetchedArticles.length).fill(false));
    };

    loadAndProcessArticles();
  }, [numOfHeadlines]);

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

    // This will hold the results of each guess, whether it's correct or not.
    let newGuessResults = [];

    // This will hold the win status for each article.
    let newArticleWins = fullArticles.map((article, index) => {
      const correctHeadline = correctHeadlines[index];
      const guessedHeadline = guessPlacement[index];

      // Check if the guessed headline matches the correct headline.
      const isCorrect = correctHeadline.every(
        (word, wordIndex) => guessedHeadline[wordIndex] === word
      );

      // Update the guess results for each word in the headline.
      const articleGuessResults = guessedHeadline.map((guess, wordIndex) =>
        guess === correctHeadline[wordIndex] ? "green" : "default"
      );

      newGuessResults.push(articleGuessResults);

      // Return the win status for this article.
      return isCorrect;
    });

    // Update the state with the new results.
    setGuessResults(newGuessResults);
    setArticleWins(newArticleWins);

    // Check if all articles are correctly guessed.
    const hasWonAll = newArticleWins.every(Boolean);
    setHasWon(hasWonAll);
  };

  // Function to update article win status
  const updateArticleWinStatus = (articleIndex, isCorrect) => {
    const updatedWins = [...articleWins];
    updatedWins[articleIndex] = isCorrect;
    setArticleWins(updatedWins);
  };

  const resetGame = () => {
    setGameDisplay(false); // Go back to the home screen
    // Reset the game state here if necessary
  };

  return (
    <div>
      {hasWon ? (
        <WinDisplay fullArticles={fullArticles} />
      ) : (
        <div className="flex flex-col gap-8">
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
            articleWins={articleWins}
            setGuessResults={setGuessResults}
            setArticleWins={setArticleWins}
            hasWon={hasWon}
            onCorrectGuess={() => updateArticleWinStatus(index, true)}
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
        </div>
      )}

      <div className="flex justify-center gap-2 py-8">
        <button
          onClick={resetGame}
          className="p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}
