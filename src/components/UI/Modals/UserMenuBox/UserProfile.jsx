import React, { useEffect, useState } from "react";
import { auth } from "../../../../config/Firebase.jsx";
import { signOut } from "firebase/auth";

export const UserProfile = ({ toggleUserMenu, handleOpenLogIn }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    email: "",
    creationTime: "",
    lastSignInTime: "",
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Update state with user details
      setUserDetails({
        displayName: user.displayName || "No display name",
        email: user.email,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      });
    }
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        handleOpenLogIn(); // Optionally redirect the user to the login screen
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-2 text-xl font-bold">Profile</p>

      <div className="flex flex-col gap-2">
        <p className="text-xl ">Welcome Back, {userDetails.displayName}!</p>
        <p>Email: {userDetails.email}</p>
        <p>Account Created: {userDetails.creationTime}</p>
        <p>Last Sign-In: {userDetails.lastSignInTime}</p>
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
