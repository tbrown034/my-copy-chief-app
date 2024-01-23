// Answers.jsx
const Answers = ({ fullArticles }) => {
  return (
    <div>
      {fullArticles.map((fullArticles, index) => (
        <div key={index}>
          <h3>{fullArticles.title}</h3>
          <p>{fullArticles.abstract}</p>
          <p>By: {fullArticles.byline}</p>
          <a href={fullArticles.url}>Read More</a>
        </div>
      ))}
    </div>
  );
};

export default Answers;
