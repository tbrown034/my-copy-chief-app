import React, { useState, useEffect } from "react";

const WordChoices = ({
  words,
  onWordClick,
  guessPlacement,
  setGuessPlacement,
  availableWords,
  setAvailableWords,
}) => {
  const [displayWords, setDisplayWords] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(false);
  const [articleWins, setArticleWins] = useState([]);

  // Effect to update displayWords when words prop changes
  useEffect(() => {
    if (isSortedAZ) {
      const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word));
      setDisplayWords(sorted);
    } else {
      // Assuming 'words' is already in the randomized order you desire when not sorted
      setDisplayWords(words);
    }
  }, [words, isSortedAZ]); // Depend on both 'words' and 'isSortedAZ'

  const toggleSort = () => {
    const sorted = [...displayWords].sort((a, b) =>
      isSortedAZ ? b.word.localeCompare(a.word) : a.word.localeCompare(b.word)
    );
    setDisplayWords(sorted);
    setIsSortedAZ(!isSortedAZ); // Toggle the sorting order
  };

  const fillRandomGuesses = () => {
    const newGuessPlacement = [...guessPlacement]; // Clone to avoid direct state mutation
    const remainingWords = availableWords.filter((word) => !word.selected); // Filter out already selected words

    for (let i = 0; i < newGuessPlacement.length; i++) {
      for (let j = 0; j < newGuessPlacement[i].length; j++) {
        if (newGuessPlacement[i][j] === null && remainingWords.length > 0) {
          // Randomly pick a word from the remainingWords
          const randomIndex = Math.floor(Math.random() * remainingWords.length);
          const word = remainingWords[randomIndex];

          // Place the word in the guess
          newGuessPlacement[i][j] = word.word;

          // Mark the word as selected and remove it from the remainingWords
          remainingWords.splice(randomIndex, 1);
          availableWords.find((w) => w.id === word.id).selected = true;
        }
      }
    }

    setGuessPlacement(newGuessPlacement); // Update the guess placement state
    setAvailableWords([...availableWords]); // Update the availableWords state to reflect the selections
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="flex gap-2">
        <button
          onClick={toggleSort}
          className="p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
        >
          Sort {isSortedAZ ? "Z-A ↓" : "A-Z ↑"}
        </button>
        <button
          onClick={fillRandomGuesses}
          className="p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-white"
        >
          Random Guesses
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 font-semibold ">
        {displayWords.map((word) => (
          <div
            onClick={() => !word.selected && onWordClick(word)}
            className={`p-4 text-xl  rounded-xl hover:cursor-pointer ${
              word.selected
                ? "bg-gray-400 dark:bg-gray-300 dark:text-gray-500  hover:cursor-not-allowed "
                : "bg-gray-200 dark:bg-zinc-500"
            } hover:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700 `}
            key={word.id}
          >
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordChoices;
