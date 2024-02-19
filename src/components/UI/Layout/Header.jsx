import Toggle from "../Shared/Toggle";
import { Popover, Transition, Menu } from "@headlessui/react";
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
        {/* <Popover className="relative">
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
            <Popover.Panel className="absolute z-10 p-2 mb-2 right-1 rounded-xl">
              <div className="rounded-lg shadow-lg ">
                <div className="relative flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-300 opacity-800 dark:bg-gray-800">
                  <button
                    onClick={() => openModal("difficulty")}
                    className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 bg-slate-200 rounded-xl"
                  >
                    Difficulty
                  </button>
                  <button
                    onClick={() => openModal("duration")}
                    className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 bg-slate-200 rounded-xl"
                  >
                    Duration
                  </button>
                </div>
              </div>
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
