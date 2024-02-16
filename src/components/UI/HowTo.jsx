import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function HowTo({
  toggleHowTo,
  changeSection,
  changeDifficulty,
  difficulty,
  section,
  difficultyOptions,
  sectionOptions,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [overlay, setOverlay] = useState(null);

  function closeModal() {
    setOverlay(null); // Close overlay
    toggleHowTo(); // If you want to close the entire modal
  }

  function openDifficultyOverlay() {
    setOverlay("difficulty");
  }

  function openSectionOverlay() {
    setOverlay("section");
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col h-full max-w-xl gap-8 p-4 my-20 overflow-hidden text-left transition-all transform bg-white shadow-xl dark:bg-gray-800 dark:text-white rounded-2xl">
                  <div>
                    <Dialog.Title className="text-2xl font-bold">
                      How To Play
                    </Dialog.Title>
                    <p className="text-xl ">Guess the headlines in 4 tries.</p>
                  </div>
                  <ul className="flex flex-col gap-2 list-disc list-inside ">
                    <li className="">
                      Make a selection from the list of words at the bottom to
                      fill in your guesses.
                    </li>
                    <li>
                      Each clickable words will fill the{" "}
                      <strong>first available</strong> spot in the guess area.
                    </li>
                    <li>
                      At any point you can also{" "}
                      <strong>click the "Random Guesses" button</strong> to
                      randomly fill the remaining guesses from the remaining
                      words.
                    </li>
                    <li>
                      After you made a guess or clicked the "Random Guesses"
                      button you can <strong>swap a word</strong> by clicking it
                      and then clicking in the guess are where you want it to
                      go.
                    </li>
                  </ul>
                  <div className="flex flex-col gap-4 ">
                    <div>
                      <p className="text-2xl font-bold ">Examples</p>
                      <p className="text-xl">See Below for a few exapmples.</p>
                    </div>

                    <div className="flex justify-center gap-4 p-2">
                      <div className="flex gap-2">
                        <div className="flex flex-wrap items-center justify-center h-20 p-2 font-bold border-2 border-gray-400 rounded-lg ">
                          Dewey
                        </div>
                        <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg dark:bg-green-600">
                          Defeats
                        </div>
                        <div className="flex flex-wrap items-center justify-center p-2 font-bold border-2 border-gray-400 rounded-lg ">
                          Truman
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center justify-center h-20 p-4 font-bold bg-red-500 border-2 border-gray-400 rounded-lg">
                          X
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 p-2">
                      <div className="flex gap-2 ">
                        <div className="flex flex-wrap items-center justify-center h-20 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg black:bg-green-600 ">
                          Truman
                        </div>
                        <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg dark:bg-green-600">
                          Defeats
                        </div>
                        <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg justify-centerp-2 dark:bg-green-600">
                          Dewey
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center justify-center h-20 p-4 font-bold bg-green-500 border-2 border-gray-400 rounded-lg ">
                          ✓
                        </div>
                      </div>
                    </div>
                  </div>
                  {!overlay ? (
                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        className="p-2 px-4 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                      <button
                        onClick={openDifficultyOverlay}
                        className="p-2 px-4 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                      >
                        Change Difficulty
                      </button>
                      <button
                        onClick={openSectionOverlay}
                        className="p-2 px-4 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                      >
                        Change Section
                      </button>
                    </div>
                  ) : null}
                  {overlay === "difficulty" && (
                    <RadioGroup value={difficulty} onChange={changeDifficulty}>
                      // Your RadioGroup for difficulty options
                    </RadioGroup>
                  )}

                  {overlay === "section" && (
                    <RadioGroup value={section} onChange={changeSection}>
                      // Your RadioGroup for section options
                    </RadioGroup>
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
