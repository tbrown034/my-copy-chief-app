import { useState } from "react";

const Hints = ({ article }) => {
  // Changed prop to expect a single article

  const [showHints, setShowHints] = useState(false);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleClick = () => {
    setShowHints((prevState) => !prevState);
  };

  return (
    <div>
      {!showHints ? (
        <div>
          <button
            onClick={handleClick}
            className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700"
          >
            Show Hint
          </button>
        </div>
      ) : (
        <div className="flex">
          <div className="flex gap-2 p-2 text-white bg-gray-800 dark:text-black dark:bg-white rounded-xl">
            <p className="">NYT Section: {article.section} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hints;
