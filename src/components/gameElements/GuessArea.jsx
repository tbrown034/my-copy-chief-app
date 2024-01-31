import { useState } from "react";

const GuessArea = ({ fullArticles }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold">Headline Guesses</h1>
      {fullArticles.map((article, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h2 className="font-bold">
            Headline #{index + 1}: ({article.title.split(/\s+/).length} words)
          </h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.title.split(/\s+/).map((_, wordIndex) => (
              <div
                key={wordIndex}
                className="w-20 h-12 bg-white border-2 border-gray-400 rounded-lg"
              ></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl">
              Clear
            </button>
            <button className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl">
              Submit
            </button>
          </div>
        </div>
      ))}

      <button className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl">
        Clear All Headlines
      </button>
    </div>
  );
};

export default GuessArea;
