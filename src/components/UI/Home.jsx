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
        <div className="flex gap-2">
          <button
            className="p-2 px-10 text-xl text-white bg-black dark:text-black dark:bg-white rounded-xl"
            onClick={() => startGame("latest")}
          >
            Latest News
          </button>
          <button
            className="p-2 px-10 text-xl text-black bg-white border-2 dark:text-white dark:bg-black border-neutral-500 rounded-xl"
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
