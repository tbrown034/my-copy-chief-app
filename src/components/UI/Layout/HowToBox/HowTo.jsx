import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "./HowToBullets";
import HowToExamples from "./HowToExamples";
import SettingsBox from "../../Shared/SettingsBox";

export default function HowTo({
  toggleHowTo,
  setNumOfHeadlines,
  setDuration,
  numOfHeadlines,
  duration,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

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

  // Adjust the handleAbout function to close the current dialog and open the 'About' dialog.
  function handleAbout() {
    setIsOpen(false); // Close the "How To" dialog
    setShowAbout(true); // Open the "About" dialog
  }

  // Function to close About dialog and open HowTo
  function handleCloseAbout() {
    setShowAbout(false); // Close the "About" dialog
    toggleHowTo(); // This should re-open the "How To" dialog if necessary
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
                      onClick={handleAbout}
                      className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      About
                    </button>
                  </div>
                  {showSettings && (
                    <SettingsBox
                      handleDifficultyChange={handleDifficultyChange}
                      handleDurationChange={handleDurationChange}
                      setDuration={setDuration}
                      duration={duration}
                      numOfHeadlines={numOfHeadlines}
                    />
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
