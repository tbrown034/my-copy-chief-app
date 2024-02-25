import React from "react";
import CurrentDate from "../Shared/CurrentDate";

export default function Home({ setShowHowTo }) {
  const handleStart = () => {
    setShowHowTo(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2 text-center">
        <i className="p-2 text-6xl fa-regular fa-newspaper"></i>
        <h1 className="text-4xl font-bold font-zillaSlab">CopyChief</h1>
        <h2 className="text-2xl ">A Wordle-inspired headline guessing game.</h2>
        <div className="py-8">
          <button
            className="p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
            onClick={handleStart}
          >
            Start
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
