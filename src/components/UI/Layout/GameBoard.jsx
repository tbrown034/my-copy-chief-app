//game.jsx

import { useState, useEffect } from "react";
import { fetchMostPopular } from "../../../utils/apiFetch";
import WordChoices from "../../gameElements/WordChoices";
import GuessArea from "../../gameElements/GuessArea";
import { shuffleArray } from "../../../utils/shuffleArray";
import WinDisplay from "./WinDisplay";

export default function GameBoard({
  setGameDisplay,
  numOfHeadlines,
  duration,
  updateUserWinCount,
  user,
  dailyPuzzle,
  isDailyGame,
  gameMetadata,
}) {
  const [fullArticles, setFullArticles] = useState([]);
  const [processedWords, setProcessedWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [guessPlacement, setGuessPlacement] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [guessResults, setGuessResults] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [guessCounter, setGuessCounter] = useState(0);
  const [hintCounter, setHintCounter] = useState(0);
  const [articleWins, setArticleWins] = useState(
    new Array(fullArticles.length).fill(false)
  );

  useEffect(() => {
    const processArticles = (articles) => {
      let wordIdCounter = 0;
      const wordsWithIds = articles.flatMap((article, index) =>
        article.title.split(/\s+/).map((word) => ({
          id: `${index}-${wordIdCounter++}`, // Increment wordIdCounter for unique IDs
          word: word,
          articleIndex: index,
          selected: false,
        }))
      );

      const shuffledWords = shuffleArray(wordsWithIds);
      setFullArticles(articles);
      setProcessedWords(shuffledWords);
      setAvailableWords(shuffledWords);

      const initialGuessPlacement = articles.map((article) =>
        Array(article.title.split(/\s+/).length).fill(null)
      );
      setGuessPlacement(initialGuessPlacement);
      setArticleWins(new Array(articles.length).fill(false));
    };

    // Conditional logic to determine if daily puzzle should be processed
    if (isDailyGame && dailyPuzzle) {
      // Assume dailyPuzzle is already in the format expected by processArticles
      processArticles(dailyPuzzle);
    } else {
      // Original logic for fetching and processing articles for custom games
      const loadAndProcessArticles = async () => {
        try {
          const fetchedArticles = await fetchMostPopular(
            numOfHeadlines,
            duration
          );
          processArticles(fetchedArticles);
        } catch (error) {
          console.error("Error fetching and processing articles:", error);
        }
      };

      loadAndProcessArticles();
    }
  }, [numOfHeadlines, duration, isDailyGame, dailyPuzzle]); // Include isDailyGame and dailyPuzzle in the dependency array

  const addWordToGuess = (selectedWord) => {
    let emptyPositionIndex = -1;
    let emptyArticleIndex = guessPlacement.findIndex(
      (articleGuesses, index) => {
        const positionIndex = articleGuesses.indexOf(null);
        if (positionIndex !== -1) {
          emptyPositionIndex = positionIndex;
          return true;
        }
        return false;
      }
    );
    if (emptyArticleIndex === -1) {
      console.log("All blanks are filled.");
      return;
    }

    const newGuessPlacement = guessPlacement.map((articleGuesses, index) => {
      if (index === emptyArticleIndex) {
        const newArticleGuesses = [...articleGuesses];
        newArticleGuesses[emptyPositionIndex] = selectedWord.word;
        return newArticleGuesses;
      }
      return articleGuesses;
    });

    setGuessPlacement(newGuessPlacement);
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

  let addToGuessCount = () => {
    setGuessCounter(guessCounter + 1);
  };

  let addToHintCounter = () => {
    setHintCounter(hintCounter + 1);
  };

  const submitGuesses = () => {
    const correctHeadlines = fullArticles.map((article) =>
      article.title.split(/\s+/)
    );
    let newGuessResults = [];
    let newArticleWins = fullArticles.map((article, index) => {
      const correctHeadline = correctHeadlines[index];
      const guessedHeadline = guessPlacement[index];
      const isCorrect = correctHeadline.every(
        (word, wordIndex) => guessedHeadline[wordIndex] === word
      );
      const articleGuessResults = guessedHeadline.map((guess, wordIndex) =>
        guess === correctHeadline[wordIndex] ? "green" : "default"
      );
      newGuessResults.push(articleGuessResults);
      addToGuessCount();
      return isCorrect;
    });

    setGuessResults(newGuessResults);
    setArticleWins(newArticleWins);
    const hasWonAll = newArticleWins.every(Boolean);
    setHasWon(hasWonAll);
    if (hasWonAll && user) {
      updateUserWinCount(user.uid);
    }
  };

  const updateArticleWinStatus = (articleIndex, isCorrect) => {
    const updatedWins = [...articleWins];
    updatedWins[articleIndex] = isCorrect;
    setArticleWins(updatedWins);
    if (hasWonAll && user) {
      // Check if the user has won and is logged in
      updateUserWinCount(user.uid); // Update the win count in Firestore
    }
  };

  const resetGame = () => {
    setGameDisplay(false);
  };
  return (
    <div className="flex flex-col gap-4">
      {hasWon ? (
        <WinDisplay
          fullArticles={fullArticles}
          guessCounter={guessCounter}
          hintCounter={hintCounter}
          articleWins={articleWins}
          isDailyGame={isDailyGame}
          gameMetadata={gameMetadata}
        />
      ) : (
        <div className="flex flex-col gap-8">
          {isDailyGame && (
            <div className="p-4 bg-blue-100 rounded-lg">
              <h2 className="text-2xl font-bold">
                Daily Game: {gameMetadata?.id}
              </h2>

              <p>Content Fetched On: {gameMetadata?.createdAt}</p>
              {/* You can format gameMetadata.createdAt more nicely using a date formatting library like date-fns if needed */}
              {/* Additional metadata details can be added here */}
            </div>
          )}
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
            guessCounter={guessCounter}
            setGuessCounter={setGuessCounter}
            addToHintCounter={addToHintCounter}
            hintCounter={hintCounter}
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

      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={resetGame}
          className="flex items-center justify-center p-2 px-8 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
        >
          <i className="mr-2 fa-regular fa-house"></i> Main Menu
        </button>
      </div>
    </div>
  );
}
