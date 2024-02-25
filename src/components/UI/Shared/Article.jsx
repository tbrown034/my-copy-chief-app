// Article.jsx

const Article = ({ article }) => {
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

  const imageUrl = getImageUrl(article.media);

  return (
    <div className="w-3/4 p-4 mx-auto my-4 rounded-lg shadow-md bg-slate-100">
      {imageUrl && (
        <img
          src={imageUrl}
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
  );
};

export default Article;
