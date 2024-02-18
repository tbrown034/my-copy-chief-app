const WinDisplay = ({ fullArticles, guessCounter }) => {
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
    <div className="flex flex-col items-center gap-8 px-4 py-8">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-semibold">Congratulations!</h2>
        <p className="text-lg ">You've guessed today's headlines correctly.</p>
      </div>
      <p>
        Solved in <b>{guessCounter}</b> Attempts!
      </p>

      {fullArticles.map((article, index) => (
        <div
          className="w-3/4 p-4 rounded-lg shadow-md bg-slate-100"
          key={index}
        >
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
    </div>
  );
};

export default WinDisplay;
