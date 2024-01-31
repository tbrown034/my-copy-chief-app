import React, { useState, useEffect } from "react";

const WordChoices = ({ words }) => {
  const [displayWords, setDisplayWords] = useState([]);
  const [isSortedAZ, setIsSortedAZ] = useState(true);

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
    <div className="flex flex-col gap-2">
      <h1>Word Choices</h1>
      <div>
        <button
          onClick={toggleSort}
          className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
        >
          Sort {isSortedAZ ? "Z-A" : "A-Z"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayWords.map(({ id, word }) => (
          <div className="p-2 bg-blue-200 rounded-xl" key={id}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordChoices;
