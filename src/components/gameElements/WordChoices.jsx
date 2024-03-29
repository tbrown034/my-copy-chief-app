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
  useEffect(() => {
    if (isSortedAZ) {
      const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word));
      setDisplayWords(sorted);
    } else {
      setDisplayWords(words);
    }
  }, [words, isSortedAZ]);
  const toggleSort = () => {
    const sorted = [...displayWords].sort((a, b) =>
      isSortedAZ ? b.word.localeCompare(a.word) : a.word.localeCompare(b.word)
    );
    setDisplayWords(sorted);
    setIsSortedAZ(!isSortedAZ);
  };
  const fillRandomGuesses = () => {
    const newGuessPlacement = [...guessPlacement];
    const remainingWords = availableWords.filter((word) => !word.selected);

    for (let i = 0; i < newGuessPlacement.length; i++) {
      for (let j = 0; j < newGuessPlacement[i].length; j++) {
        if (newGuessPlacement[i][j] === null && remainingWords.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingWords.length);
          const word = remainingWords[randomIndex];
          newGuessPlacement[i][j] = word.word;
          remainingWords.splice(randomIndex, 1);
          availableWords.find((w) => w.id === word.id).selected = true;
        }
      }
    }
    setGuessPlacement(newGuessPlacement);
    setAvailableWords([...availableWords]);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex gap-2">
        <button
          onClick={toggleSort}
          className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700"
        >
          <i
            className={`fa-regular ${
              isSortedAZ ? "fa-sort-alpha-up" : "fa-sort-alpha-down"
            } mr-2`}
          ></i>
          Sort
        </button>
        <button
          onClick={fillRandomGuesses}
          className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700"
        >
          <i className="mr-2 fa-regular fa-random"></i>
          Random Guesses
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 font-semibold">
        {displayWords.map((word) => (
          <div
            onClick={() => !word.selected && onWordClick(word)}
            className={`p-2 text-lg rounded-xl hover:cursor-pointer ${
              word.selected
                ? "bg-gray-400 dark:bg-gray-300 dark:text-gray-500 hover:cursor-not-allowed"
                : "bg-gray-200 dark:bg-zinc-500"
            } hover:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700`}
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
