import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const SettingsBox = ({
  handleDifficultyChange,
  handleDurationChange,
  duration,
  numOfHeadlines,
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
    <div className="flex flex-col gap-2 pt-2 pl-2 ">
      <p className="text-lg font-bold ">Settings</p>
      <ul className="px-4 list-disc ">
        <li>Difficulty sets how many headlines you have to solve.</li>
        <li>
          Time period sets whether the top headlines are from the past day,
          seven days or month.{" "}
        </li>
      </ul>
      <div className="flex justify-center gap-4 p-4 rounded-xl">
        {/* Difficulty Selector */}
        <div className="relative overflow-visible">
          <Listbox
            value={selectedDifficulty}
            onChange={(e) => {
              handleDifficultyChange(e.value);
            }}
          >
            <Listbox.Button className="flex items-center gap-2 p-2 text-left bg-white border-2 border-black rounded-lg shadow-md cursor-default border-opacity-35 sm:text-sm dark:text-black">
              <span className="">Difficulty</span>

              <i className="fa-solid fa-angle-down"></i>
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
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
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
                            <i className="fa-solid fa-check"></i>
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

        {/* Duration Selector */}
        <div className="relative">
          <Listbox
            value={selectedDuration}
            onChange={(e) => {
              handleDurationChange(e.value);
            }}
          >
            <Listbox.Button className="flex items-center gap-2 p-2 text-left bg-white border-2 border-black rounded-lg shadow-md cursor-default border-opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 sm:text-sm dark:text-black">
              <span className="">Duration</span>

              <i className="fa-solid fa-angle-down"></i>
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
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
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
                            <i className="fa-solid fa-check"></i>
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
  );
};

export default SettingsBox;
