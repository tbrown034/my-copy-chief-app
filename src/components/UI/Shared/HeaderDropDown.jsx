import { Menu } from "@headlessui/react";

export const HeaderDropDown = ({
  toggleHowTo,
  toggleUserMenu,
  toggleAbout,
  toggleSettings,
  backToHome,
  playGame,
  darkMode,
  toggleTheme,
  isLoggedIn,
  handleUserAction,
}) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="text-2xl hover:text-gray-500">
          <i className="fa-regular fa-bars"></i>
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div>
                  {isLoggedIn ? (
                    <button
                      onClick={() => handleUserAction("profile")}
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <i className="mr-2 fa-regular fa-user-check"></i> Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserAction("login")}
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <i className="mr-2 fa-regular fa-user"></i> Login
                    </button>
                  )}
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleHowTo}
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className="mr-2 fa-regular fa-question-circle"></i> How to
                  Play
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleSettings}
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className="mr-2 fas fa-gear"></i> Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleAbout}
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className="mr-2 fa-regular fa-info-circle"></i> About
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={playGame}
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <i className="mr-2 fas fa-play"></i> Play Now
                </button>
              )}
            </Menu.Item>
            {/* Toggle theme button */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleTheme}
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
      </Menu>
    </div>
  );
};
