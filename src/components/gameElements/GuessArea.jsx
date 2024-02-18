import { useState, useEffect } from "react";
import Article from "../UI/Shared/Article";
import ConfirmSolveBox from "../UI/Shared/ConfirmSolveBox";
import Hints from "../UI/Shared/HInts";

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
  guessCounter,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMadeAGuess, setHasMadeAGuess] = useState(false);
  const [isSolutionRevealed, setIsSolutionRevealed] = useState(false);

  useEffect(() => {
    const hasGuess = guessPlacement.flat().some((guess) => guess !== null);
    setHasMadeAGuess(hasGuess);
  }, [guessPlacement]);

  const clearAllGuesses = () => {
    const resetState = guessPlacement.map((guesses) =>
      Array(guesses.length).fill(null)
    );
    setGuessPlacement(resetState);
    setAvailableWords(
      availableWords.map((word) => ({ ...word, selected: false }))
    );
    setGuessResults(resetState);
    setIsSolutionRevealed(false);
  };
  // const isEveryGuessFilled = () =>
  //   guessPlacement.every((headline) => headline.every(Boolean));

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
    setIsSolutionRevealed(true);
  };

  const confirmSolve = () => {
    solvePuzzle();
    // Logic to instantly solve the puzzle
    setIsOpen(false); // Close the modal upon confirmation
  };

  const handleInstantSolve = () => {
    setIsOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {fullArticles.map((article, articleIndex) => (
            <div key={articleIndex}>
              {articleWins[articleIndex] ? (
                <Article article={article} />
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col justify-center">
                    <p className="font-sans text-lg font-semibold">
                      Headline {articleIndex + 1}
                    </p>
                    <p className="font-serif opacity-80 ">
                      Published {formatDate(article.published_date)}
                    </p>
                  </div>
                  <Hints article={article} />
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
            disabled={!hasMadeAGuess}
            className={`p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 ${
              !hasMadeAGuess ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Clear Guesses
          </button>
          <button
            onClick={submitGuesses}
            className="p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700"
          >
            Submit Guesses
          </button>
          <button
            onClick={handleInstantSolve}
            disabled={isSolutionRevealed}
            className={`p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 ${
              isSolutionRevealed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Show Solution
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4 m-4 text-xl font-semibold border-2 border-black dark:border-white rounded-xl ">
          <div className="flex items-center justify-around gap-2">
            <p>Correct Guesses:</p>
            <p className="p-2 text-white bg-black rounded-xl dark:bg-white dark:text-black">
              {articleWins.filter(Boolean).length} of {fullArticles.length}
            </p>
          </div>
          <div className="flex items-center justify-around gap-2">
            <p>Number of Guesses:</p>
            <p className="p-2 px-4 m-2 text-white bg-black dark:bg-white dark:text-black rounded-xl ">
              {guessCounter}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuessArea;
