import { useState } from "react";
import Answers from "./Answers";

const GuessArea = ({
  fullArticles,
  guessPlacement,
  setGuessPlacement,
  availableWords,
  setAvailableWords,
  handleGuessClick,
  selectedGuess,
  submitGuesses,
  guessResults,
  hasWon,
  setGuessResults,
  setShowAnswers,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const clearAllGuesses = () => {
    const resetState = guessPlacement.map((guesses) =>
      Array(guesses.length).fill(null)
    );
    setGuessPlacement(resetState);
    setAvailableWords(
      availableWords.map((word) => ({ ...word, selected: false }))
    );
    setGuessResults(resetState);
  };

  const clearGuesses = (articleIndex) => {
    const newGuessPlacement = guessPlacement.map((guesses, index) =>
      index === articleIndex ? Array(guesses.length).fill(null) : guesses
    );
    setGuessPlacement(newGuessPlacement);

    const currentlyGuessedWords =
      newGuessPlacement[articleIndex].filter(Boolean);
    const newAvailableWords = availableWords.map((word) => ({
      ...word,
      selected: !currentlyGuessedWords.includes(word.word),
    }));
    setAvailableWords(newAvailableWords);

    const newGuessResults = guessResults.map((results, index) =>
      index === articleIndex ? Array(results.length).fill(null) : results
    );
    setGuessResults(newGuessResults);
  };

  const isEveryGuessFilled = () =>
    guessPlacement.every((headline) => headline.every(Boolean));

  const solvePuzzle = () => {
    const newGuessPlacement = fullArticles.map(
      (article) => article.title.split(/\s+/) //
    );

    const newAvailableWords = availableWords.map((word) => ({
      ...word,
      selected: true,
    }));

    setGuessPlacement(newGuessPlacement);
    setAvailableWords(newAvailableWords);

    const newGuessResults = newGuessPlacement.map(
      (articleGuesses) => articleGuesses.map(() => "green") // Assuming "green" indicates correct
    );
    setGuessResults(newGuessResults);
  };

  return (
    <>
      {hasWon ? (
        <div>
          <Answers
            setShowAnswers={setShowAnswers}
            fullArticles={fullArticles}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-12 p-4 px-8">
            {fullArticles.map((article, articleIndex) => (
              <div key={articleIndex} className="">
                <div className="flex flex-wrap gap-2">
                  {article.title.split(/\s+/).map((_, wordIndex) => {
                    const resultClass = guessResults[articleIndex]?.[wordIndex];
                    let bgColorClass =
                      resultClass === "green"
                        ? " bg-green-500 dark:bg-green-600"
                        : resultClass === "yellow"
                        ? "bg-yellow-400 dark:bg-yellow-500"
                        : "";
                    const isSelected =
                      selectedGuess?.articleIndex === articleIndex &&
                      selectedGuess?.wordIndex === wordIndex;
                    const isHovered =
                      `${articleIndex}-${wordIndex}` === hoveredIndex;
                    if (isSelected || (selectedGuess && isHovered)) {
                      bgColorClass = "bg-gray-300 dark:bg-gray-700";
                    }

                    return (
                      <div
                        key={wordIndex}
                        className={`h-20 p-2 text-lg flex justify-center items-center font-bold border-2 border-gray-400 rounded-lg min-w-20 cursor-pointer ${bgColorClass}`}
                        onClick={() =>
                          handleGuessClick(articleIndex, wordIndex)
                        }
                        onMouseEnter={() =>
                          setHoveredIndex(`${articleIndex}-${wordIndex}`)
                        }
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {guessPlacement[articleIndex][wordIndex]}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 py-8">
            <button
              onClick={clearAllGuesses}
              className="p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
            >
              Clear All Headlines
            </button>
            <button
              onClick={submitGuesses}
              disabled={!isEveryGuessFilled()}
              className={`p-2 px-10 text-xl rounded-xl transition duration-150 ease-in-out shadow-sm ${
                isEveryGuessFilled()
                  ? "border border-black bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:active:bg-gray-800 dark:focus:ring-white"
                  : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              }`}
            >
              Submit
            </button>
            <button
              onClick={solvePuzzle}
              className="p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
            >
              Solve
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuessArea;
