import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import SettingsBox from "../Shared/SettingsBox"; // Adjust the path as necessary
import Toggle from "../Shared/Toggle"; // Adjust the path as necessary

export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
  toggleHowTo,
  numOfHeadlines,
  setNumOfHeadlines,
  duration,
  setDuration,
}) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(false);
    }
  };

  // Assuming handleDifficultyChange and handleDurationChange functions
  // are passed as props or implemented here to update the global state.

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
          <i className="fa-regular hover:text-gray-500 fa-circle-question"></i>
        </button>
        <Popover className="relative">
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
            <Popover.Panel className="absolute z-10 p-2 mb-2 right-1 rounded-xl bg-slate-300 opacity-800 dark:bg-gray-800">
              <SettingsBox
                handleDifficultyChange={setNumOfHeadlines} // Adapt this if needed
                handleDurationChange={setDuration} // Adapt this if needed
                duration={duration}
                numOfHeadlines={numOfHeadlines}
              />
            </Popover.Panel>
          </Transition>
        </Popover>
        <Toggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}
