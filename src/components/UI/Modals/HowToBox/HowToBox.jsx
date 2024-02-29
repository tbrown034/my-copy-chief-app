import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "./HowToBullets";
import HowToExamples from "./HowToExamples";
import SettingsExtended from "../SettingBoxes/SettingsExtended";

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
                <Dialog.Panel className="flex flex-col gap-4 p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl dark:bg-gray-200 rounded-2xl">
                  <Dialog.Title className="text-2xl font-bold underline underline-offset-8">
                    How To Play
                  </Dialog.Title>
                  <HowToBullets />
                  <HowToExamples />
                  <p className="pt-2 text-xl font-bold border-t border-black border-opacity-30 ">
                    Get Started
                  </p>
                  {!showSettings && (
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={toggleHowTo}
                          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                        >
                          <i className="mr-2 fa-regular fa-arrow-left"></i> Back
                        </button>
                        <button
                          onClick={playGame}
                          className="flex items-center justify-center p-2 px-6 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 "
                        >
                          <i className="mr-2 fa-regular fa-play"></i> Play
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={displaySettings}
                          className="flex items-center justify-center gap-2 p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 "
                        >
                          <span>Settings</span>{" "}
                          {showSettings ? (
                            <i className="fa-regular fa-angle-up"></i>
                          ) : (
                            <i className="fa-regular fa-angle-down"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {showSettings && (
                    <SettingsExtended
                      handleDifficultyChange={handleDifficultyChange}
                      handleDurationChange={handleDurationChange}
                      setDuration={setDuration}
                      duration={duration}
                      numOfHeadlines={numOfHeadlines}
                      playGame={playGame}
                      showHowTo={showHowTo}
                      isDarkMode={isDarkMode}
                      toggleHowTo={toggleHowTo}
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
