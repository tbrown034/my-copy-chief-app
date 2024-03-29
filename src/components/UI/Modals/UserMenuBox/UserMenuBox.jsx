import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserLogin } from "./UserLogIn";
import { UserRegister } from "./UserRegister";
import { UserProfile } from "./UserProfile";
const UserMenuBox = ({
  toggleUserMenu,
  userMenuView,
  setUserMenuView,
  handleLogOut,
  handleUserAction,
}) => {
  const renderComponent = () => {
    switch (userMenuView) {
      case "login":
        return (
          <UserLogin
            handleUserAction={handleUserAction}
            userMenuView={userMenuView}
            toggleUserMenu={toggleUserMenu}
            setUserMenuView={setUserMenuView}
          />
        );
      case "register":
        return (
          <UserRegister
            toggleUserMenu={toggleUserMenu}
            setUserMenuView={setUserMenuView}
          />
        );
      case "profile":
        return (
          <UserProfile
            toggleUserMenu={toggleUserMenu}
            handleLogOut={handleLogOut}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Transition appear show={userMenuView !== ""} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          toggleUserMenu(false);
          setUserMenuView("");
        }}
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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold underline underline-offset-8">
                    User
                  </h3>
                  {renderComponent()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default UserMenuBox;
