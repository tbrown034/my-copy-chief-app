const WinDisplay = ({
  fullArticles,
  guessCounter,
  hintCounter,
  articleWins,
}) => {
  const getImageUrl = (mediaArray) => {
    if (
      mediaArray.length > 0 &&
      mediaArray[0]["media-metadata"] &&
      mediaArray[0]["media-metadata"].length > 0
    ) {
      const mediumImage =
        mediaArray[0]["media-metadata"].find(
          (m) => m.format === "mediumThreeByTwo210"
        ) || mediaArray[0]["media-metadata"][0];
      return mediumImage.url;
    }
    return "";
  };
  return (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <h2 className="text-3xl font-semibold ">Congratulations!</h2>
        <p className="text-lg ">You've guessed all the headlines correctly!</p>
      </div>
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
      <h2 className="text-3xl font-semibold ">Read the News</h2>
      {fullArticles.map((article, index) => (
        <div className="p-4 rounded-lg shadow-lg bg-slate-300 " key={index}>
          {article.media && article.media.length > 0 && (
            <img
              src={getImageUrl(article.media)}
              alt={article.title || "Article image"}
              className="mb-4 rounded-lg"
            />
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold hover:underline dark:text-black"
          >
            {article.title}
          </a>
          <p className="mt-2 text-gray-700">{article.abstract}</p>
        </div>
      ))}
      <p className="text-center">
        See more trending stories from{" "}
        <a
          className="underline underline-offset-4 hover:text-sky-600 "
          href="https://www.nytimes.com/trending/"
        >
          The New York Times
        </a>
      </p>
    </div>
  );
};

export default WinDisplay;
