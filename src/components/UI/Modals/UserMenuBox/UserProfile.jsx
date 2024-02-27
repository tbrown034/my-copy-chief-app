import React from "react";
import { auth } from "../../../../config/Firebase.jsx";
import { signOut } from "firebase/auth";

export const UserProfile = ({ toggleUserMenu, handleOpenLogIn }) => {
  // Function to handle user logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
        handleOpenLogIn(); // Optionally redirect the user to the login screen
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="pt-2 text-xl font-bold">Profile</p>
        <p className="text-sm">
          Welcome Back! Below is a summary of your stats to date.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="pt-2 text-xl font-bold">Your Stats</p>
        <div className="flex flex-col gap-2 p-2 border border-black rounded-xl ">
          <p>Wins:</p>
          <p>Clean Wins:</p>
          <p>Hints:</p>
          <p>Guesses:</p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleUserMenu}
          type="button"
          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
        >
          <i className="mr-2 fa-regular fa-arrow-left"></i>Back
        </button>
        <button
          onClick={handleLogout} // Updated to use the handleLogout function
          type="button"
          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
        >
          <i className="mr-2 fa-regular fa-sign-out"></i>Log Out
        </button>
      </div>
    </div>
  );
};
