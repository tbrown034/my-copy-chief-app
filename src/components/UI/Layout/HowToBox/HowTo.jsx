import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "./HowToBullets";
import HowToExamples from "./HowToExamples";
import SettingsBox from "../../Shared/SettingsBox";

export default function HowTo({ toggleHowTo, setNumOfHeadlines }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  function handleDifficultyChange(value) {
    setNumOfHeadlines(value); // Apply the selected difficulty
    toggleHowTo(); // Close the modal and start the game
    setShowSettings(false); // Hide difficulty options
  }

  function handleDurationChange(value) {
    setDuration(value); // Apply the selected duration
    setShowSettings(false); // Hide settings options
    toggleHowTo(); // Close the modal and start the game
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

                  <div className="flex justify-center gap-2 mt-6 ">
                    <button
                      onClick={displaySettings}
                      className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      Settings{" "}
                    </button>
                    <button
                      onClick={() => toggleHowTo()}
                      className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      About
                    </button>
                  </div>
                  {showSettings && (
                    <div className="flex">
                      <SettingsBox
                        handleDifficultyChange={handleDifficultyChange}
                        handleDurationChange={handleDurationChange}
                      />
                    </div>
                  )}
                  <div className="flex justify-center">
                    {" "}
                    <button
                      onClick={() => toggleHowTo()}
                      className="p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      OK, Let's Play!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
