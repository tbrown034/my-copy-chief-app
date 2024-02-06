import React, { useState, useEffect } from "react";

const WordChoices = ({ words, onWordClick }) => {
  const [displayWords, setDisplayWords] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(false);

  // Effect to update displayWords when words prop changes
  useEffect(() => {
    setDisplayWords(words);
  }, [words]);

  const toggleSort = () => {
    const sorted = [...displayWords].sort((a, b) =>
      isSortedAZ ? b.word.localeCompare(a.word) : a.word.localeCompare(b.word)
    );
    setDisplayWords(sorted);
    setIsSortedAZ(!isSortedAZ); // Toggle the sorting order
  };

  return (
    <div className="flex flex-col gap-4 mt-10 border-t-2 border-black border-dotted">
      <h1 className="mt-10 text-lg font-bold">Word Choices</h1>
      <div>
        <button
          onClick={toggleSort}
          className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
        >
          Sort {isSortedAZ ? "Z-A ↓" : "A-Z ↑"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayWords.map((word) => (
          <div
            onClick={() => !word.selected && onWordClick(word)}
            className={`p-2 bg-blue-800 text-xl text-white  rounded-xl hover:cursor-pointer ${
              word.selected ? "bg-gray-400" : ""
            }`}
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
