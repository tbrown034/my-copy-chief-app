import React, { useState, useEffect } from "react";

const WordChoices = ({ words }) => {
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

  // Function to handle word click
  const clickWord = (word) => {
    console.log(word);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>Word Choices</h1>
      <button
        onClick={toggleSort}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Sort {isSortedAZ ? "Z-A ↓" : "A-Z ↑"}
      </button>
      <div className="flex flex-wrap gap-2">
        {displayWords.map((word) => (
          <div
            onClick={() => clickWord(word)}
            className={`p-2 bg-blue-200 rounded-xl ${
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
