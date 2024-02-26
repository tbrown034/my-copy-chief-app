import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Settings from "../Shared/Settings";

const SettingsBox = ({
  toggleSettings,
  handleDifficultyChange,
  handleDurationChange,
  duration,
  numOfHeadlines,
  playGame,
  showHowTo,
  isDarkMode,
}) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleSettings}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col gap-4 p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
                <Settings
                  handleDifficultyChange={handleDifficultyChange}
                  handleDurationChange={handleDurationChange}
                  duration={duration}
                  numOfHeadlines={numOfHeadlines}
                  playGame={playGame}
                  showHowTo={showHowTo}
                  isDarkMode={isDarkMode}
                  toggleSettings={toggleSettings}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsBox;
