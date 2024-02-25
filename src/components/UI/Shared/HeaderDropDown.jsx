import { Menu } from "@headlessui/react";

export const HeaderDropDown = ({
  toggleHowTo,
  toggleUserMenu,
  toggleAbout,
  toggleSettings,
  backToHome,
  playGame,
}) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className=" hover:text-gray-500">
          <i className="fa-solid fa-bars"></i>
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={toggleUserMenu}
                >
                  <i className="mr-2 fa-regular fa-user"></i> Login
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={toggleHowTo}
                >
                  <i className="mr-2 fa-regular fa-question-circle"></i> How to
                  Play
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={toggleSettings}
                >
                  <i className="mr-2 fas fa-gear"></i> Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={toggleAbout}
                >
                  <i className="mr-2 fa-regular fa-info-circle"></i> About
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={playGame}
                >
                  <i className="mr-2 fas fa-play"></i> Play Now
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
