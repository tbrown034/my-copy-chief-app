import { useState } from "react";

const Hints = ({ article, addToHintCounter }) => {
  const [showHints, setShowHints] = useState(false);

  const handleClick = () => {
    setShowHints((prevState) => !prevState);
    addToHintCounter();
  };

  return (
    <div>
      {!showHints ? (
        <div>
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 text-sm bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700"
          >
            <i className="mr-2 fa-regular fa-magnifying-glass-plus"></i> Show
            Hint
          </button>
        </div>
      ) : (
        <div className="flex">
          <div className="flex gap-2 p-2 text-sm text-white bg-gray-800 dark:text-black dark:bg-white rounded-xl">
            <p className="">NYT Section: {article.section} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hints;
