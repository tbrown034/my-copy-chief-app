// Answers.jsx
const Answers = ({ fullArticles, setShowAnswers }) => {
  const handleClick = () => {
    setShowAnswers(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-semibold">Congratulations!! You Won. </div>
      {fullArticles.map((fullArticles, index) => (
        <div className="flex flex-col gap-2" key={index}>
          {/* Assuming multimedia is an array and we're interested in the first image */}
          {fullArticles.multimedia && fullArticles.multimedia.length > 0 && (
            <img
              src={fullArticles.multimedia[0].url} // Access the URL of the first multimedia item
              alt={fullArticles.multimedia[0].caption || "Article image"} // Provide an alt using the caption if available
              className="rounded-lg "
            />
          )}
          <a className="text-xl font-bold" href={fullArticles.url}>
            {fullArticles.title}
          </a>
          <p>{fullArticles.abstract}</p>
        </div>
      ))}
      <div>
        <button
          onClick={handleClick}
          className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Answers;
