export const Scoreboard = ({
  hintCounter,
  guessCounter,
  articleWins,
  fullArticles,
}) => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-center gap-2 p-4 px-8 border-2 border-black items dark:border-white rounded-xl ">
        <div className="flex flex-col gap-4 px-8">
          <h3 className="text-center">Scoreboard</h3>
          <div className="flex items-center justify-around gap-2">
            <p>Correct:</p>
            <p className="p-2 border-2 border-black rounded-xl dark:border-white ">
              {articleWins.filter(Boolean).length} of {fullArticles.length}
            </p>
          </div>
          <div className="flex items-center justify-around gap-2 s">
            <p>Guesses:</p>
            <p className="p-2 px-6 border-2 border-black rounded-xl dark:border-white ">
              {guessCounter}
            </p>
          </div>
          <div className="flex items-center justify-around gap-2 s">
            <p>Hints Used:</p>
            <p className="p-2 px-6 border-2 border-black rounded-xl dark:border-white ">
              {hintCounter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
