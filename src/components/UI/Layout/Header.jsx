import Toggle from "../Shared/Toggle";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
  toggleHowTo,
}) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(!gameDisplay);
    }
  };

  return (
    <div className="flex justify-between p-2 pb-6 border-b-2 border-opacity-20 border-b-black dark:border-b-white dark:border-opacity-20">
      <a
        onClick={backToHome}
        className="flex items-center gap-2 text-2xl font-bold font-zillaSlab hover:cursor-pointer "
      >
        <i className="p-2 fa-regular fa-newspaper rounded-2xl"></i>
        <div className="">CopyChief</div>
      </a>
      <div className="flex items-center justify-center gap-2 text-2xl">
        <button onClick={toggleHowTo}>
          {" "}
          <i className="fa-regular fa-circle-question"></i>
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
            <Popover.Panel className="absolute z-10 w-48 max-w-xs mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-4 p-4 bg-white dark:bg-gray-800">
                  <button
                    onClick={() => openModal("difficulty")}
                    className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Difficulty
                  </button>
                  <button
                    onClick={() => openModal("duration")}
                    className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Time Period
                  </button>
                </div>
              </div>
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
