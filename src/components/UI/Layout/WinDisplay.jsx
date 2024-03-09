import React from "react";
import { Scoreboard } from "../Shared/Scoreboard";

const WinDisplay = ({
  fullArticles,
  guessCounter,
  hintCounter,
  articleWins,
  isDailyGame, // Use to differentiate daily game wins
  gameMetadata, // Access game metadata, including document ID and fetch time
}) => {
  // Function to extract the image URL from the article's media array
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

  // Custom message for daily game wins, showing the document ID and creation date
  const renderDailyWinMessage = () => (
    <div>
      <h2 className="text-3xl font-semibold">Daily Challenge Conquered!</h2>
      <p className="text-lg">You've successfully completed the Daily Game:</p>
      <p className="text-md">Game ID: {gameMetadata?.id}</p>
      <p className="text-md">Content Fetched On: {gameMetadata?.createdAt}</p>
    </div>
  );

  // Default win message for non-daily games
  const renderWinMessage = () => (
    <div>
      <h2 className="text-3xl font-semibold">Congratulations!</h2>
      <p className="text-lg">You've guessed all the headlines correctly!</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-2">
      {isDailyGame ? renderDailyWinMessage() : renderWinMessage()}

      <h2 className="text-3xl font-semibold">Read the News</h2>
      {fullArticles.map((article, index) => (
        <div className="" key={index}>
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
      <Scoreboard
        articleWins={articleWins}
        hintCounter={hintCounter}
        guessCounter={guessCounter}
        fullArticles={fullArticles}
      />
      <p className="text-center">
        See more trending stories from{" "}
        <a
          className="underline underline-offset-4 hover:text-sky-600"
          href="https://www.nytimes.com/trending/"
        >
          The New York Times
        </a>
      </p>
    </div>
  );
};

export default WinDisplay;
