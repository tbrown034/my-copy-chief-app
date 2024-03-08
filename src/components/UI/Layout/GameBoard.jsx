import { useState, useEffect } from "react";
import { fetchMostPopular } from "../../../utils/apiFetch";
import WordChoices from "../../gameElements/WordChoices";
import GuessArea from "../../gameElements/GuessArea";
import { shuffleArray } from "../../../utils/shuffleArray";
import WinDisplay from "./WinDisplay";

/**
 * GameBoard component - renders the main game area, including word choices and the guess area.
 * Handles logic for playing the game, submitting guesses, and playing previous editions.
 */
export default function GameBoard({
  setGameDisplay,
  numOfHeadlines,
  duration,
  updateUserWinCount,
  user,
  dailyPuzzle,
  isDailyGame,
  gameMetadata,
  formatTime,
}) {
  // State hooks to manage various aspects of the game.
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
  const [articleWins, setArticleWins] = useState([]);

  // Effect hook to load and process articles when component mounts or certain states change.
  useEffect(() => {
    const loadAndProcessArticles = async () => {
      console.log("Loading and processing articles for the game...");
      let articlesToProcess = dailyPuzzle;
      if (!isDailyGame || !dailyPuzzle) {
        try {
          articlesToProcess = await fetchMostPopular(numOfHeadlines, duration);
          console.log(`Fetched ${articlesToProcess.length} articles.`);
        } catch (error) {
          console.error("Error fetching and processing articles:", error);
        }
      }

      // Process each word in the articles for the game logic.
      let wordIdCounter = 0;
      const wordsWithIds = articlesToProcess.flatMap((article, index) =>
        article.title.split(/\s+/).map((word) => ({
          id: `${index}-${wordIdCounter++}`,
          word,
          articleIndex: index,
          selected: false,
        }))
      );

      // Shuffle the words to create the word choices for the game.
      const shuffledWords = shuffleArray(wordsWithIds);
      console.log("Shuffled words for the game board.");
      setFullArticles(articlesToProcess);
      setProcessedWords(shuffledWords);
      setAvailableWords(shuffledWords);

      // Initialize guess placement for each article title.
      const initialGuessPlacement = articlesToProcess.map((article) =>
        Array(article.title.split(/\s+/).length).fill(null)
      );
      setGuessPlacement(initialGuessPlacement);
      setArticleWins(new Array(articlesToProcess.length).fill(false));
    };

    loadAndProcessArticles();
  }, [numOfHeadlines, duration, isDailyGame, dailyPuzzle]);

  const addWordToGuess = (selectedWord) => {
    let newGuessPlacement = [...guessPlacement];
    let foundSpot = false;
    for (let i = 0; i < newGuessPlacement.length; i++) {
      for (let j = 0; j < newGuessPlacement[i].length; j++) {
        if (newGuessPlacement[i][j] === null) {
          newGuessPlacement[i][j] = selectedWord.word;
          foundSpot = true;
          break;
        }
      }
      if (foundSpot) break;
    }

    if (!foundSpot) {
      console.log("All blanks are filled.");
      return;
    }

    setGuessPlacement(newGuessPlacement);
    setAvailableWords(
      availableWords.map((word) =>
        word.id === selectedWord.id ? { ...word, selected: true } : word
      )
    );
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

  let addToGuessCount = () => {
    setGuessCounter(guessCounter + 1);
  };

  let addToHintCounter = () => {
    setHintCounter(hintCounter + 1);
  };

  const playPreviousEdition = async () => {
    // Assuming gameMetadata contains the current edition number
    const prevEdition = gameMetadata.edition - 1;
    if (prevEdition < 1) {
      console.log("No previous edition available.");
      return;
    }

    // Fetch the puzzle for the previous edition
    const puzzlesRef = collection(db, "dailyPuzzles");
    const prevEditionQuery = query(
      puzzlesRef,
      where("metadata.edition", "==", prevEdition)
    );
    const querySnapshot = await getDocs(prevEditionQuery);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      setDailyPuzzle(docData.articles); // Assuming articles is stored directly
      setGameMetadata({
        id: docData.id, // Assuming id or date is stored
        createdAt: docData.createdAt,
        edition: docData.metadata.edition,
      });
      setIsDailyGame(true);
      setGameDisplay(true);
    } else {
      console.log("Failed to fetch the previous edition.");
    }
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
          {isDailyGame && gameMetadata && (
            <div className="p-4 bg-blue-100 rounded-lg">
              <h2 className="text-2xl font-bold">
                Daily Game: {gameMetadata?.id}
              </h2>
              <p>
                Content Fetched On:{" "}
                {formatTime(new Date(gameMetadata.createdAt))} EST
              </p>
              <p>Edition: {gameMetadata.edition}</p>
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
          onClick={() => setGameDisplay(false)}
          className="flex items-center justify-center p-2 px-8 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}
