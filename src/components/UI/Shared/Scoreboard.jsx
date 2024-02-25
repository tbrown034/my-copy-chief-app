export const Scoreboard = ({
  hintCounter,
  guessCounter,
  articleWins,
  fullArticles,
}) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center gap-2 p-4 px-8 border-2 border-black items dark:border-white rounded-xl ">
        <h3 className="text-center">Scoreboard</h3>
        <div className="flex items-center justify-around gap-4">
          <p>Correct:</p>
          <p className="p-2 px-8 border-2 border-black rounded-xl dark:border-white ">
            {articleWins.filter(Boolean).length} of {fullArticles.length}
          </p>
        </div>
        <div className="flex items-center justify-around gap-4">
          <p>Guesses:</p>
          <p className="p-2 px-12 border-2 border-black rounded-xl dark:border-white ">
            {guessCounter}
          </p>
        </div>
        <div className="flex items-center justify-around gap-4">
          <p>Hints Used:</p>
          <p className="p-2 px-12 border-2 border-black rounded-xl dark:border-white ">
            {hintCounter}
          </p>
        </div>
      </div>
    </div>
  );
};
