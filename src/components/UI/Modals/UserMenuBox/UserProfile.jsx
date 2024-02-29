import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export const UserProfile = ({ toggleUserMenu, handleLogOut }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    email: "",
    creationTime: "",
    lastSignInTime: "",
    wins: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const unsubDoc = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUserDetails({
              displayName: data.displayName || "No display name",
              email: data.email,
              creationTime: data.creationTime || user.metadata.creationTime,
              lastSignInTime:
                data.lastSignInTime || user.metadata.lastSignInTime,
              wins: data.wins || 0,
            });
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubDoc();
      } else {
        setUserDetails({
          displayName: "",
          email: "",
          creationTime: "",
          lastSignInTime: "",
          wins: 0,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-2 text-xl font-bold">Profile</p>

      <div className="flex flex-col gap-2">
        <p className="text-xl ">Welcome Back, {userDetails.displayName}!</p>
        <p>Email: {userDetails.email}</p>
        <p>Account Created: {userDetails.creationTime}</p>
        <p>Last Sign-In: {userDetails.lastSignInTime}</p>
        <p>Wins: {userDetails.wins}</p>
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
