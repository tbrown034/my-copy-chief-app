import React from "react";

const GuessArea = ({ fullArticles }) => {
  return (
    <div className="guess-area">
      <h1 className="text-lg font-bold">Headline Guesses</h1>
      {fullArticles.map((article, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold">
            Headline #{index + 1}: ({article.title.split(/\s+/).length} words)
          </h2>
          <div className="flex gap-2 mb-2">
            {article.title.split(/\s+/).map((_, wordIndex) => (
              <div
                key={wordIndex}
                className="w-16 h-8 border-2 border-gray-400"
              ></div>
            ))}
          </div>
          <button className="p-1 mr-2 border-2 rounded">Clear</button>
          <button className="p-1 border-2 rounded">Submit</button>
        </div>
      ))}
      <button className="p-1 mt-4 border-2 rounded">Clear All Headlines</button>
    </div>
  );
};

export default GuessArea;
