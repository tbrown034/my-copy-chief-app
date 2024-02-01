const GuessArea = ({
  fullArticles,
  guessPlacement,
  setGuessPlacement,
  addWordToGuess,
  setAvailableWords,
  availableWords,
}) => {
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
  };

  // Function to submit the guesses for checking
  const submitGuesses = () => {
    // Here you would check the guesses against the actual headlines
  };

  return (
    <div className="flex flex-col gap-4">
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
                  className="flex items-center justify-center h-12 p-2 text-lg font-bold text-blue-900 bg-white border-2 border-gray-400 rounded-lg min-w-20"
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
