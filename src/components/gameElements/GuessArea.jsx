import { useState } from "react";
import Article from "../UI/Article";
import ConfirmSolveBox from "../UI/ConfirmSolveBox";

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
  setGuessResults,
  articleWins,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    const newGuessResults = newGuessPlacement.map((articleGuesses) =>
      articleGuesses.map(() => "green")
    );
    setGuessResults(newGuessResults);
  };

  const confirmSolve = () => {
    solvePuzzle();
    // Logic to instantly solve the puzzle
    setIsOpen(false); // Close the modal upon confirmation
  };

  const handleInstantSolve = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="font-bold">
          {articleWins.filter(Boolean).length} of {fullArticles.length}{" "}
          Headlines Correctly Guessed
        </div>
        <div className="flex flex-col gap-4">
          {fullArticles.map((article, articleIndex) => (
            <div key={articleIndex}>
              {/* Check if the article has been guessed correctly and display the Article component */}
              {articleWins[articleIndex] ? (
                <Article article={article} />
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold ">Headline {articleIndex + 1}</p>
                  <div className="flex flex-wrap gap-2">
                    {article.title.split(/\s+/).map((_, wordIndex) => {
                      const resultClass =
                        guessResults[articleIndex]?.[wordIndex];
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
                          className={`h-10 p-2 flex justify-center items-center font-bold border-2 border-gray-400 rounded-lg min-w-12 cursor-pointer ${bgColorClass}`}
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
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 ">
          {isOpen && (
            <ConfirmSolveBox
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              confirmSolve={confirmSolve}
            />
          )}
          <button
            onClick={clearAllGuesses}
            className="p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
          >
            Clear Guesses
          </button>
          <button
            onClick={handleInstantSolve}
            className="p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
          >
            Show Solution
          </button>
          <button
            onClick={submitGuesses}
            disabled={!isEveryGuessFilled()}
            className={`p-2  text-lg rounded-xl transition duration-150 ease-in-out shadow-sm ${
              isEveryGuessFilled()
                ? "border border-black bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:active:bg-gray-800 dark:focus:ring-white"
                : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            Enter Guesses
          </button>
        </div>
      </div>
    </>
  );
};
export default GuessArea;
