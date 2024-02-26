import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "./HowToBullets";
import HowToExamples from "./HowToExamples";
import Settings from "../../Shared/Settings";

export default function HowTo({
  toggleHowTo,
  setNumOfHeadlines,
  setDuration,
  numOfHeadlines,
  duration,
  playGame,
  showHowTo,
  isDarkMode,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  function handleDifficultyChange(value) {
    setNumOfHeadlines(value); // Apply the selected difficulty
  }

  function handleDurationChange(value) {
    console.log(`Setting duration to: ${value}`);
    setDuration(value); // Apply the selected duration
  }

  function displaySettings() {
    setShowSettings((prev) => !prev);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => toggleHowTo()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col gap-4 p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl dark:bg-gray-800 dark:text-white rounded-2xl">
                  <Dialog.Title className="text-2xl font-bold">
                    How To Play
                  </Dialog.Title>
                  <HowToBullets />
                  <HowToExamples />
                  <p className="pt-2 text-xl font-bold border-t border-black border-opacity-30 ">
                    Get Started
                  </p>
                  {/* Conditionally render the Play button based on showSettings state */}
                  {!showSettings && (
                    <div className="flex justify-center gap-4 ">
                      <button
                        onClick={playGame}
                        className="p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                      >
                        Play
                      </button>
                      <button
                        onClick={toggleHowTo}
                        className="p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                      >
                        Back
                      </button>
                    </div>
                  )}
                  <div className="flex justify-center gap-2 ">
                    <button
                      onClick={displaySettings}
                      className="flex items-center justify-center gap-2 p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      <span>Settings</span>{" "}
                      {showSettings ? (
                        <i className="fa-solid fa-angle-up"></i> // Arrow up when settings are shown
                      ) : (
                        <i className="fa-solid fa-angle-down"></i> // Arrow down when settings are hidden
                      )}
                    </button>
                  </div>

                  {showSettings && (
                    <Settings
                      handleDifficultyChange={handleDifficultyChange}
                      handleDurationChange={handleDurationChange}
                      setDuration={setDuration}
                      duration={duration}
                      numOfHeadlines={numOfHeadlines}
                      playGame={playGame}
                      showHowTo={showHowTo}
                      isDarkMode={isDarkMode}
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
