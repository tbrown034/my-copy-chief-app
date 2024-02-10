// Answers.jsx
const Answers = ({ fullArticles, setShowAnswers }) => {
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
      // Find a 'medium' sized image for better mobile display if available
      const mediumImage =
        mediaArray[0]["media-metadata"].find(
          (m) => m.format === "mediumThreeByTwo210"
        ) || mediaArray[0]["media-metadata"][0];
      return mediumImage.url;
    }
    return ""; // Return a default image URL or an empty string if no image is found
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Congratulations!
      </h2>
      <p className="mb-8 text-lg text-center">
        You've guessed today's headlines correctly. Here's what's making the
        news:
      </p>
      {fullArticles.map((article, index) => (
        <div
          className="w-full max-w-md p-4 mb-6 bg-white rounded-lg shadow-md"
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
            className="text-xl font-bold hover:underline"
          >
            {article.title}
          </a>
          <p className="mt-2 text-gray-700">{article.abstract}</p>
        </div>
      ))}
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
