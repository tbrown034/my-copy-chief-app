// Answers.jsx
const Answers = ({ fullArticles, setShowAnswers }) => {
  const handleClick = () => {
    setShowAnswers(false);
  };

  return (
    <div>
      {fullArticles.map((fullArticles, index) => (
        <div key={index}>
          <a className="font-semibold" href={fullArticles.url}>
            <h3 className="font-bold">{fullArticles.title}</h3>
          </a>
        </div>
      ))}
      <button
        onClick={handleClick}
        className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
      >
        Back to Game
      </button>
    </div>
  );
};

export default Answers;
