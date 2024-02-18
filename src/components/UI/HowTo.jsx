import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "../UI/HowToBullets";
import HowToExamples from "../UI/HowToExamples";

export default function HowTo({
  toggleHowTo,
  setNumOfHeadlines, // Function passed from App to update the number of headlines
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showDifficultyOptions, setShowDifficultyOptions] = useState(false);

  function handleDifficultyChange(value) {
    setNumOfHeadlines(value); // Apply the selected difficulty
    toggleHowTo(); // Close the modal and start the game
    setShowDifficultyOptions(false); // Hide difficulty options
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
                  <div className="flex gap-2 mt-8">
                    <button
                      onClick={() => toggleHowTo()}
                      className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      Got it, thanks!
                    </button>
                    <button
                      onClick={() =>
                        setShowDifficultyOptions(!showDifficultyOptions)
                      }
                      className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                    >
                      Change Difficulty
                    </button>
                  </div>
                  {showDifficultyOptions && (
                    <div className="flex">
                      <div className="flex flex-col mt-4">
                        {[
                          { label: "Easy (1 Headline)", value: 1 },
                          { label: "Medium (2 Headlines)", value: 2 },
                          { label: "Hard (3 Headlines)", value: 3 },
                        ].map((difficulty) => (
                          <button
                            key={difficulty.value}
                            onClick={() =>
                              handleDifficultyChange(difficulty.value)
                            }
                            className="p-2 my-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                          >
                            {difficulty.label}
                          </button>
                        ))}
                      </div>
                    </div>
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
