// Answers.jsx
const Answers = ({ fullArticles, setShowAnswers }) => {
  const handleClick = () => {
    setShowAnswers(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {fullArticles.map((fullArticles, index) => (
        <div key={index}>
          <a className="font-semibold" href={fullArticles.url}>
            <h3 className="font-bold">{fullArticles.title}</h3>
          </a>
        </div>
      ))}
      <div>
        <button
          onClick={handleClick}
          className="p-2 px-10 text-xl text-white bg-black rounded-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-slate-300 dark:focus:bg-slate-200 dark:active:bg-slate-400 active:bg-slate-800"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default Answers;
