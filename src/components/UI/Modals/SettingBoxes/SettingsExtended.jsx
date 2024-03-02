import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const SettingsExtended = ({
  handleDifficultyChange,
  handleDurationChange,
  duration,
  numOfHeadlines,
  playGame,
  toggleHowTo,
  playDailyGame,
}) => {
  const difficulties = [
    { label: "Easy", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Hard", value: 3 },
  ];

  const durations = [
    { label: "1 Day", value: 1 },
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
  ];

  // Find the difficulty and duration objects, or default to the first if not found
  const selectedDifficulty =
    difficulties.find((d) => d.value === numOfHeadlines) || difficulties[1];
  const selectedDuration =
    durations.find((d) => d.value === duration) || durations[0];

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold underline underline-offset-8 ">
          Settings
        </p>
        <ul className="flex flex-col gap-4 list-disc list-inside ">
          <li>
            <b>Difficulty:</b> This setting determines how many headlines you
            need to solve. A higher difficulty means more headlines, increasing
            the challenge.
          </li>
          <li>
            <b>Duration:</b> This option lets you choose the timeframe for the
            headlines you'll be working with. You can select from the last day,
            week or month.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-2">
          <div className="flex justify-center gap-4 p-2 rounded-xl">
            <div className="relative overflow-visible">
              <Listbox
                value={selectedDifficulty}
                onChange={(e) => {
                  handleDifficultyChange(e.value);
                }}
              >
                <Listbox.Button className="flex items-center justify-center gap-2 p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100">
                  <span className="">Difficulty</span>
                  <i className="fa-regular fa-angle-down"></i>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border-2 border-black rounded-md shadow-lg border-opacity-35 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {difficulties.map((difficulty, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={difficulty}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-amber-900 bg-amber-100"
                              : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {difficulty.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <i className="fa-regular fa-check"></i>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
            <div className="relative">
              <Listbox
                value={selectedDuration}
                onChange={(e) => {
                  handleDurationChange(e.value);
                }}
              >
                <Listbox.Button className="flex items-center justify-center gap-2 p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100">
                  <span className="">Duration</span>

                  <i className="fa-regular fa-angle-down"></i>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border-2 border-black rounded-md shadow-lg border-opacity-35 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {durations.map((duration, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={duration}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-amber-900 bg-amber-100"
                              : "text-gray-900"
                          } cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {duration.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <i className="fa-regular fa-check"></i>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={playGame}
            className="p-2 px-4 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100"
          >
            <i className="mr-2 fa-regular fa-play"></i> Play Now
          </button>
          <button
            onClick={playDailyGame}
            className="p-2 px-4 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100"
          >
            <i className="mr-2 fa-regular fa-play"></i> Daily Games
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={toggleHowTo}
            className="p-2 px-4 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
          >
            <i className="mr-2 fa-regular fa-arrow-left"></i> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsExtended;
