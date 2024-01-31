const GuessArea = ({
  fullArticles,
  guessPlacement,
  setGuessPlacement,
  addWordToGuess,
}) => {
  // Function to clear all guesses
  const clearAllGuesses = () => {
    setGuessPlacement(
      fullArticles.map((article) =>
        Array(article.title.split(/\s+/).length).fill(null)
      )
    );
  };

  // Function to clear guesses for a specific headline
  const clearGuesses = (headlineIndex) => {
    setGuessPlacement(
      guessPlacement.map((guess, index) => {
        return index === headlineIndex ? Array(guess.length).fill(null) : guess;
      })
    );
  };

  // Function to submit the guesses for checking
  const submitGuesses = () => {
    // Here you would check the guesses against the actual headlines
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold">Headline Guesses</h1>
      {fullArticles.map((article, articleIndex) => {
        const words = article.title.split(/\s+/);
        return (
          <div key={articleIndex} className="flex flex-col gap-2">
            <h2 className="font-bold">
              Headline #{articleIndex + 1}: ({words.length} words)
            </h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {words.map((_, wordIndex) => (
                <div
                  key={wordIndex}
                  className="w-20 h-12 bg-white border-2 border-gray-400 rounded-lg"
                  onClick={() => addWordToGuess(articleIndex, wordIndex)}
                >
                  {guessPlacement[articleIndex] &&
                    guessPlacement[articleIndex][wordIndex]}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => clearGuesses(articleIndex)}
                className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
              >
                Clear
              </button>
              <button
                onClick={submitGuesses}
                className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={clearAllGuesses}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Clear All Headlines
      </button>
    </div>
  );
};

export default GuessArea;
