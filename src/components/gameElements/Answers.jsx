// Answers.jsx
const Answers = ({ fullArticles, setShowAnswers, guessResults }) => {
  const handleClick = () => {
    setShowAnswers(false);
  };

  // Helper function to extract image URL
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
    return ""; // Return a default image URL or an empty string if no image is found
  };

  // Check if all headlines are correctly guessed
  const allCorrect = guessResults.every((result) =>
    result.every((status) => status === "green")
  );

  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8">
      {allCorrect && (
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-semibold">Congratulations!</h2>
          <p className="mb-8 text-lg">
            You've guessed today's headlines correctly.
          </p>
        </div>
      )}
      {fullArticles.map((article, index) => {
        const isArticleCorrect = guessResults[index].every(
          (status) => status === "green"
        );
        return (
          isArticleCorrect && (
            <div
              className="w-3/4 p-4 rounded-lg shadow-md bg-slate-100"
              key={index}
            >
              {article.media && article.media.length > 0 && (
                <img
                  src={getImageUrl(article.media)}
                  alt={article.title || "Article image"}
                  className="mb-4 rounded-lg "
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
          )
        );
      })}
      <button
        onClick={handleClick}
        className="p-2 px-10 mt-8 text-xl text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        Play Again
      </button>
    </div>
  );
};

export default Answers;
