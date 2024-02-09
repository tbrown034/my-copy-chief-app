import React, { useState, useEffect } from "react";

const WordChoices = ({ words, onWordClick }) => {
  const [displayWords, setDisplayWords] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(false);

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

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div>
        <button
          onClick={toggleSort}
          className="p-2 text-lg text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
        >
          Sort {isSortedAZ ? "Z-A ↓" : "A-Z ↑"}
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
