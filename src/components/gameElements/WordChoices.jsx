const WordChoices = ({ fullArticles }) => {
  let words = fullArticles.flatMap((article) => article.title.split(/\s+/));

  return (
    <div>
      <h1>Word Choices</h1>
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => (
          <div className="p-2 bg-blue-200 rounded-xl" key={index}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordChoices;
