import { useState } from "react";

const GuessArea = ({
  fullArticles,
  guessPlacement,
  setGuessPlacement,
  setAvailableWords,
  availableWords,
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
    // Clear all guesses
    const newGuessPlacement = guessPlacement.map((guesses) =>
      Array(guesses.length).fill(null)
    );

    // Reset the selected state for all words
    const newAvailableWords = availableWords.map((word) => ({
      ...word,
      selected: false,
    }));

    setGuessPlacement(newGuessPlacement);
    setAvailableWords(newAvailableWords);
    const resetGuessResults = newGuessPlacement.map(
      (articleGuesses) => Array(articleGuesses.length).fill(null) // Or whatever your default state is
    );
    setGuessResults(resetGuessResults);
  };

  const clearGuesses = (articleIndex) => {
    // Find the words that are currently guessed for this article
    const currentlyGuessedWords = guessPlacement[articleIndex].filter(
      (word) => word !== null
    );

    // Clear the guesses for the specific headline
    const newGuessPlacement = [...guessPlacement];
    newGuessPlacement[articleIndex] = Array(
      newGuessPlacement[articleIndex].length
    ).fill(null);

    // Reset the selected state for the words that were in the cleared guesses
    const newAvailableWords = availableWords.map((word) => {
      // If the word is in the list of currently guessed words, reset its selected state
      if (currentlyGuessedWords.includes(word.word)) {
        return { ...word, selected: false };
      }
      return word;
    });

    setGuessPlacement(newGuessPlacement);
    setAvailableWords(newAvailableWords);
    // Also reset guess results for this specific headline
    const newGuessResults = [...guessResults];
    newGuessResults[articleIndex] = Array(
      newGuessPlacement[articleIndex].length
    ).fill(null); // Reset guess results for the cleared headline
    setGuessResults(newGuessResults);
  };

  const isEveryGuessFilled = () => {
    return guessPlacement.every((headline) =>
      headline.every((word) => word !== null)
    );
  };

  return (
    <div className="">
      {hasWon && (
        <div className="win-message">
          <p className="p-4 mb-4 text-2xl text-center text-green-700 bg-green-200 rounded-lg">
            Congratulations! You've guessed all headlines correctly!
          </p>
        </div>
      )}
      {fullArticles.map((article, articleIndex) => {
        const words = article.title.split(/\s+/);

        return (
          <div
            key={articleIndex}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {words.map((_, wordIndex) => {
                const resultClass = guessResults[articleIndex]?.[wordIndex];
                let bgColorClass = ""; // Default background color
                if (resultClass === "green") bgColorClass = "bg-green-500"; // Correct guess
                if (resultClass === "yellow") bgColorClass = "bg-yellow-500"; // Partially correct guess

                // Highlight logic for selected word
                const isSelected =
                  selectedGuess &&
                  selectedGuess.articleIndex === articleIndex &&
                  selectedGuess.wordIndex === wordIndex;
                if (isSelected) bgColorClass = "bg-gray-300 dark:bg-gray-700"; // Apply selected word highlight

                // Hover logic: Apply different highlight if any word is selected
                const isHovered =
                  `${articleIndex}-${wordIndex}` === hoveredIndex;
                if (selectedGuess && isHovered) {
                  // Only apply hover highlight if a word is selected
                  bgColorClass = "bg-gray-200 dark:bg-gray-700";
                }
                return (
                  <div
                    key={wordIndex}
                    className={`flex items-center justify-center h-20 p-2 text-lg font-bold  ${bgColorClass} border-2 border-gray-400 rounded-lg min-w-20  cursor-pointer ${
                      selectedGuess?.articleIndex === articleIndex &&
                      selectedGuess?.wordIndex === wordIndex
                        ? "bg-gray-100" // Highlight selected guess, if needed
                        : ""
                    }`}
                    onClick={() => handleGuessClick(articleIndex, wordIndex)}
                    onMouseEnter={() =>
                      selectedGuess
                        ? setHoveredIndex(`${articleIndex}-${wordIndex}`)
                        : null
                    }
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {guessPlacement[articleIndex][wordIndex]}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 py-8 ">
              {/* <button
                onClick={() => clearGuesses(articleIndex)}
                className="p-2 px-8 text-xl text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
              >
                Clear
              </button> */}
            </div>
          </div>
        );
      })}
      <div className="flex justify-center gap-2 py-8 ">
        <button
          onClick={clearAllGuesses}
          className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
        >
          Clear All Headlines
        </button>
        <button
          onClick={submitGuesses}
          disabled={!isEveryGuessFilled()}
          className={`p-2 px-10 text-xl rounded-xl focus:outline-none transition duration-150 ease-in-out border-2
    ${
      isEveryGuessFilled()
        ? "border-black hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500 dark:border-white dark:bg-black dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600"
        : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-700"
    }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GuessArea;
