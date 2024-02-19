import { useState } from "react";

const SettingsBox = ({
  handleDifficultyChange,
  handleDurationChange,
  duration,
  setDuration,
}) => {
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);
  const [showDurationOptions, setDurationOptions] = useState(false);

  function displayDifficultyOptions() {
    setShowDifficultyOptions((prev) => !prev);
  }

  function displayDurationOptions() {
    setDurationOptions((prev) => !prev);
  }

  return (
    <>
      <div className="flex justify-center gap-8 text-center">
        <div>
          <button
            onClick={displayDifficultyOptions}
            className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
          >
            Difficulty{" "}
          </button>
        </div>
        <div>
          <button
            onClick={displayDurationOptions}
            className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
          >
            Time Period
          </button>
        </div>
      </div>

      {showDifficultyOptions && (
        <div className="p-8 m-2 border-2 border-black dark:border-white rounded-xl">
          <h3 className="font-semibold ">Difficulty</h3>
          <p>
            Choose your challenge level by selecting the number of headlines to
            solve: 'Easy' for a single headline, 'Medium' for two, and 'Hard'
            for three.
          </p>
          <div className="flex flex-col items-center mt-4">
            {[
              { label: "Easy", value: 1 },
              { label: "Medium", value: 2 },
              { label: "Hard", value: 3 },
            ].map((difficulty) => (
              <button
                key={difficulty.value}
                onClick={() => handleDifficultyChange(difficulty.value)}
                className="w-1/2 p-2 my-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {showDurationOptions && (
        <div className="p-8 m-2 border-2 border-black dark:border-white rounded-xl">
          <h3 className="font-semibold">Duration</h3>
          <p>
            Tailor your news puzzle to recent or extended periods by selecting
            the duration. Opt for '1 Day' for the latest, '7 Days' for a weekly
            recap, or '30 Days' for a comprehensive monthly review.
          </p>
          <div className="flex flex-col items-center mt-4">
            {[
              { label: "1 Day", value: 1 },
              { label: "7 Days", value: 7 },
              { label: "30 Days", value: 30 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleDurationChange(option.value)} // You need to define this function
                className="w-1/2 p-2 my-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsBox;
