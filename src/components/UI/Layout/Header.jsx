import React from "react";
import Toggle from "../Shared/Toggle"; // Adjust the path as necessary
import { HeaderDropDown } from "../Shared/HeaderDropDown";

export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
  toggleHowTo,
  toggleAbout,
  toggleSettings,
  playGame,
  isLoggedIn,
  handleUserAction,
  playDailyGame,
}) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(false);
    }
  };
  return (
    <div className="flex items-center justify-between p-2 pb-6 border-b-2 border-opacity-20 border-b-black dark:border-b-white dark:border-opacity-20">
      <a
        onClick={backToHome}
        className="flex items-center gap-2 text-2xl font-bold font-zillaSlab hover:cursor-pointer"
      >
        <i className="p-2 fa-regular fa-newspaper rounded-2xl"></i>
        CopyChief
      </a>
      <div className="md:hidden">
        <HeaderDropDown
          toggleAbout={toggleAbout}
          toggleHowTo={toggleHowTo}
          toggleSettings={toggleSettings}
          toggleTheme={toggleTheme}
          backToHome={backToHome}
          playGame={playGame}
          darkMode={darkMode}
          isLoggedIn={isLoggedIn}
          handleUserAction={handleUserAction}
          playDailyGame={playDailyGame}
        />
      </div>
      <div className="items-center justify-center hidden gap-2 text-2xl md:flex">
        <button onClick={toggleHowTo}>
          <i className="fa-regular hover:text-gray-500 fa-info-circle"></i>
        </button>
        <button onClick={toggleAbout}>
          <i className="fa-regular fa-question-circle hover:text-gray-500 dark:hover:text-gray-300"></i>
        </button>
        {isLoggedIn ? (
          <button onClick={() => handleUserAction("profile")}>
            <i className="fas fa-user-check hover:text-gray-500 dark:hover:text-gray-300"></i>{" "}
          </button>
        ) : (
          <button onClick={() => handleUserAction("login")}>
            <i className="fa-regular fa-user hover:text-gray-500 dark:hover:text-gray-300"></i>{" "}
          </button>
        )}
        <button onClick={toggleSettings}>
          <i className="fas fa-gear hover:text-gray-500 dark:hover:text-gray-300"></i>
        </button>
        <Toggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}
