import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function HowTo({ chooseNumOfheadlines, toggleHowTo }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDifficultyDisplay, setisDifficultyDisplay] = useState(false);

  function closeModal() {
    toggleHowTo();
  }

  const changeDifficulty = () => {
    setisDifficultyDisplay(true);
  };

  const chooseDifficulty = (number) => {
    chooseNumOfheadlines(number);
    closeModal();
  };

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
                <Dialog.Panel className="flex flex-col h-full max-w-xl gap-8 p-6 my-20 overflow-hidden text-left transition-all transform bg-white shadow-xl dark:bg-gray-800 dark:text-white rounded-2xl">
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

                    <div className="flex gap-6">
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
                    <div className="flex gap-6">
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
                  {!isDifficultyDisplay ? (
                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        className="p-2 px-4 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                      <button
                        onClick={changeDifficulty}
                        className="p-2 px-4 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                      >
                        Change Difficulty
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col grid-cols-2 gap-4 mt-4 lg:grid">
                      <div>
                        <button
                          onClick={() => chooseDifficulty(1)}
                          className="flex flex-col p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                        >
                          <p>Easy</p>
                          <p className="text-sm">(1 Headline)</p>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => chooseDifficulty(2)}
                          className="flex flex-col p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                        >
                          <p>Medium (Default)</p>
                          <p className="text-sm">(2 Headlines)</p>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => chooseDifficulty(3)}
                          className="flex flex-col p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                        >
                          <p>Hard</p>
                          <p className="text-sm">(3 Headlines)</p>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => chooseDifficulty(4)}
                          className="flex flex-col p-2 px-10 text-xl bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700 "
                        >
                          <p>Very Hard </p>
                          <p className="text-sm">(4 Headlines)</p>
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
