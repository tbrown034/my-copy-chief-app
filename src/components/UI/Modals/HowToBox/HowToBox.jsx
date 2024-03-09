import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import HowToBullets from "./HowToBullets";
import HowToExamples from "./HowToExamples";

export default function HowTo({
  toggleHowTo,
  setNumOfHeadlines,
  setDuration,
  setShowHowTo,
  toggleHowToAndSettings,
  showHomeScreen,
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

  function closeHowTo() {
    setShowHowTo((prev) => !prev);
  }

  function backTohome() {
    setShowHowTo((prev) => !prev);
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
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-center">
                        <button
                          onClick={closeHowTo}
                          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 "
                        >
                          Continue
                        </button>
                      </div>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={showHomeScreen} // Call the function on click
                          className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                        >
                          Back To Home
                        </button>
                        <button
                          onClick={() => toggleHowToAndSettings()} // Use the passed function on click
                          className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                        >
                          Custom Game
                        </button>
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
