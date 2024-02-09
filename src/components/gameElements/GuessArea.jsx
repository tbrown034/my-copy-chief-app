import { useState } from "react";

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
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to clear all guesses
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

  return (
    <div className="flex flex-col items-center gap-4">
      {hasWon && (
        <div className="p-4 mb-4 text-2xl text-center text-green-700 bg-green-200 rounded-lg win-message">
          Congratulations! You've guessed all headlines correctly!
        </div>
      )}
      <div className="flex flex-col gap-12 p-4 px-8">
        {fullArticles.map((article, articleIndex) => (
          <div key={articleIndex} className="">
            <div className="flex flex-wrap gap-2 mb-2">
              {article.title.split(/\s+/).map((_, wordIndex) => {
                const resultClass = guessResults[articleIndex]?.[wordIndex];
                let bgColorClass =
                  resultClass === "green"
                    ? "bg-green-500"
                    : resultClass === "yellow"
                    ? "bg-yellow-500"
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
                    onClick={() => handleGuessClick(articleIndex, wordIndex)}
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
      <div className="flex justify-center gap-2 py-8">
        <button
          onClick={clearAllGuesses}
          className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-slate-300"
        >
          Clear All Headlines
        </button>
        <button
          onClick={submitGuesses}
          disabled={!isEveryGuessFilled()}
          className={`p-2 px-10 text-xl rounded-xl transition duration-150 ease-in-out border-2 ${
            isEveryGuessFilled()
              ? "border-black hover:bg-gray-200 active:bg-gray-300  dark:border-white"
              : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-700"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GuessArea;
