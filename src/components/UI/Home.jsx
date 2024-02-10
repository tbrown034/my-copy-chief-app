import React from "react";
import CurrentDate from "./CurrentDate";

export default function Home({ setGameDisplay }) {
  const handleClick = () => {
    setGameDisplay(true); // We can start the game directly without specifying the mode
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2 text-center">
        <i className="p-2 text-6xl fa-regular fa-newspaper"></i>
        <h1 className="text-4xl font-bold font-zillaSlab">CopyChief</h1>
        <h2 className="text-2xl ">A Wordle-inspired headline guessing game.</h2>
        <div className="py-8">
          <button
            className="p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border-white dark:hover:bg-gray-700 dark:focus:ring-white"
            onClick={handleClick}
          >
            Play Game
          </button>
        </div>
        <CurrentDate />
        <p>
          Created by{" "}
          <a
            className="underline underline-offset-4 hover:text-sky-600"
            href="https://trevorthewebdeveloper.com/"
          >
            Trevor Brown
          </a>
        </p>
      </div>
    </>
  );
}
