import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import SettingsBox from "../Modals/SettingsBox"; // Adjust the path as necessary
import Toggle from "../Shared/Toggle"; // Adjust the path as necessary

export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
  toggleHowTo,
  setNumOfHeadlines,
  setDuration,
  numOfHeadlines,
  duration,
  toggleAbout,
  toggleSettings,
}) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(false);
    }
  };

  // Correctly wrap the setters in functions
  const handleDifficultyChange = (value) => {
    setNumOfHeadlines(value);
  };

  const handleDurationChange = (value) => {
    setDuration(value);
  };

  return (
    <div className="flex justify-between p-2 pb-6 border-b-2 border-opacity-20 border-b-black dark:border-b-white dark:border-opacity-20">
      <a
        onClick={backToHome}
        className="flex items-center gap-2 text-2xl font-bold font-zillaSlab hover:cursor-pointer"
      >
        <i className="p-2 fa-regular fa-newspaper rounded-2xl"></i>
        CopyChief
      </a>
      <div className="flex items-center justify-center gap-2 text-2xl">
        <button onClick={toggleHowTo}>
          <i className="fa-regular hover:text-gray-500 fa-info-circle"></i>
        </button>
        <button onClick={toggleAbout}>
          <i className="fa-regular fa-question-circle hover:text-gray-500 dark:hover:text-gray-300"></i>
        </button>
        <button onClick={toggleHowTo}>
          <i className="fas fa-gear hover:text-gray-500 dark:hover:text-gray-300"></i>
        </button>

        {/* <Popover className="">
          <Popover.Button>
            <i className="fas fa-gear hover:text-gray-500 dark:hover:text-gray-300"></i>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-10 px-2 m-4 mr-12 text-sm text-black bg-gray-100 border-2 border-black right-2 dark:text-white rounded-xl dark:bg-gray-800">
              <SettingsBox
                handleDifficultyChange={handleDifficultyChange}
                handleDurationChange={handleDurationChange}
                duration={duration}
                numOfHeadlines={numOfHeadlines}
              />
            </Popover.Panel>
          </Transition>
        </Popover> */}
        <Toggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}
