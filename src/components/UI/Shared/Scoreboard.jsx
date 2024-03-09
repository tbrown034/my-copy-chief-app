export const Scoreboard = ({
  hintCounter,
  guessCounter,
  articleWins,
  fullArticles,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-white border-2 border-black dark:border-white rounded-xl dark:bg-black">
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Scoreboard
      </h3>
      <div className="flex items-center justify-around w-full gap-4">
        <p className="text-lg text-gray-800 dark:text-gray-200">Correct:</p>
        <p className="p-2 px-8 text-lg text-gray-800 border-2 border-black dark:border-white rounded-xl dark:text-gray-200">
          {articleWins.filter(Boolean).length} of {fullArticles.length}
        </p>
      </div>
      <div className="flex items-center justify-around w-full gap-4">
        <p className="text-lg text-gray-800 dark:text-gray-200">Guesses:</p>
        <p className="p-2 px-12 text-lg text-gray-800 border-2 border-black dark:border-white rounded-xl dark:text-gray-200">
          {guessCounter}
        </p>
      </div>
      <div className="flex items-center justify-around w-full gap-4">
        <p className="text-lg text-gray-800 dark:text-gray-200">Hints Used:</p>
        <p className="p-2 px-12 text-lg text-gray-800 border-2 border-black dark:border-white rounded-xl dark:text-gray-200">
          {hintCounter}
        </p>
      </div>
    </div>
  );
};
