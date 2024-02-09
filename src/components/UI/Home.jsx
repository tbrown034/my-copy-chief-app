import CurrentDate from "./CurrentDate";

export default function Home({ setGameDisplay, startGame }) {
  const handleClick = () => {
    setGameDisplay(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2 text-center">
        <i className="p-2 text-6xl fa-regular fa-newspaper rounded-2xl"></i>
        <h1 className="text-4xl font-bold font-zillaSlab">CopyChief</h1>
        <h2 className="text-2xl ">A Wordle-inspired headline guessing game.</h2>
        <div className="flex gap-2 py-8">
          <button
            className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
            onClick={() => startGame("latest")}
          >
            Latest News
          </button>

          <button
            className="p-2 px-10 text-xl text-black bg-white border-4 rounded-xl border-neutral-500 hover:bg-slate-200 active:bg-slate-300 focus:ring-2 focus:ring-neutral-500 focus:outline-none dark:text-white dark:bg-black dark:border-neutral-400 dark:hover:bg-slate-800 dark:active:bg-slate-700 dark:focus:bg-slate-600"
            onClick={() => startGame("popular")}
          >
            Most Popular
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
