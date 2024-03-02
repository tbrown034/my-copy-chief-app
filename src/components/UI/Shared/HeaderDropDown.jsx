import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const HeaderDropDown = ({
  toggleHowTo,
  toggleAbout,
  toggleSettings,
  playGame,
  darkMode,
  toggleTheme,
  isLoggedIn,
  handleUserAction,
  playDailyGame,
}) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <i className="text-xl fa-regular fa-bars"></i>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {isLoggedIn ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleUserAction("profile")}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                    >
                      <i className="mr-2 fa-regular fa-user-check"></i> Profile
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleUserAction("login")}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                    >
                      <i className="mr-2 fa-regular fa-user"></i> Login
                    </button>
                  )}
                </Menu.Item>
              )}
              <div className="border-t border-gray-200"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleHowTo}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i className="mr-2 fa-regular fa-question-circle"></i> How
                    to Play
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleSettings}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i className="mr-2 fas fa-gear"></i> Settings
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleAbout}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i className="mr-2 fa-regular fa-info-circle"></i> About
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={playGame}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i className="mr-2 fas fa-play"></i> Play Now
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={playDailyGame}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i className="mr-2 fas fa-play"></i> Daily Games
                  </button>
                )}
              </Menu.Item>
              <div className="border-t border-gray-200"></div>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleTheme}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                  >
                    <i
                      className={`mr-2 fas ${darkMode ? "fa-sun" : "fa-moon"}`}
                    ></i>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
