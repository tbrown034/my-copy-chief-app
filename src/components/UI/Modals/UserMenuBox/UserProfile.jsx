import React, { useEffect, useState } from "react";
import { auth } from "../../../../config/Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";

export const UserProfile = ({ toggleUserMenu, handleLogOut }) => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    email: "",
    creationTime: "",
    lastSignInTime: "",
  });

  useEffect(() => {
    // Set up the observer on the auth object
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const details = {
          displayName: user.displayName || "No display name",
          email: user.email,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };
        setUserDetails(details);

        // Determine if it's the user's first time logging in
        setIsFirstTime(details.creationTime === details.lastSignInTime);
      } else {
        // User is signed out
        setUserDetails({
          displayName: "",
          email: "",
          creationTime: "",
          lastSignInTime: "",
        });
        setIsFirstTime(false);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-2 text-xl font-bold">Profile</p>
      {isFirstTime ? <div>first</div> : <div>welcome back </div>}

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
          onClick={handleLogOut} // Updated to use the handleLogout function
          type="button"
          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
        >
          <i className="mr-2 fa-regular fa-sign-out"></i>Log Out
        </button>
      </div>
    </div>
  );
};
