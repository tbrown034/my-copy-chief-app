import React from "react";
import CurrentDate from "../Shared/CurrentDate";
import { auth } from "../../../config/Firebase";
import { signOut } from "firebase/auth";

export default function Home({
  handleUserAction,
  isLoggedIn,
  user,
  playDailyGame,
}) {
  const displayName = user?.displayName || user?.email || "there";

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6 text-center">
        {" "}
        {/* Increased padding and gap for the main container */}
        <i className="p-3 text-6xl fa-regular fa-newspaper"></i>{" "}
        {/* Adjusted padding */}
        <h1 className="text-5xl font-bold">CopyChief</h1>{" "}
        {/* Adjusted font size for the title */}
        <h2 className="text-2xl">
          A Wordle-inspired headline guessing game.
        </h2>{" "}
        {/* Adjusted font size for the subtitle */}
        <div className="flex flex-col items-center justify-center gap-8 py-10">
          {" "}
          {/* Adjusted vertical padding */}
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-6">
              {" "}
              {/* Increased gap */}
              <button
                onClick={() => handleUserAction("profile")}
                className="text-xl underline-offset-4 hover:underline"
              >
                Hello, {displayName}!
              </button>{" "}
              {/* Adjusted font size */}
              <button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      console.log("Signed out successfully");
                    })
                    .catch((error) => {
                      console.error("Sign out error", error);
                    });
                }}
                className="text-gray-500 text-md hover:underline underline-offset-4"
              >
                (Log out)
              </button>{" "}
              {/* Adjusted font size */}
              <button
                className="flex items-center justify-center p-3 px-12 text-xl text-white bg-black shadow-sm rounded-3xl hover:bg-gray-700 active:bg-gray-500 dark:text-black dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-400"
                onClick={playDailyGame}
              >
                Play
              </button>{" "}
              {/* Adjusted padding and font size */}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {" "}
              {/* Increased gap */}
              <button
                className="flex items-center justify-center p-3 px-16 text-xl text-white bg-black shadow-sm rounded-3xl hover:bg-gray-700 active:bg-gray-500 dark:text-black dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-400"
                onClick={playDailyGame}
              >
                Play
              </button>{" "}
              {/* Adjusted padding and font size */}
              <div className="flex flex-col items-center gap-4">
                {" "}
                {/* Added flex container for date and creator info with increased gap */}
                <CurrentDate />
                <p>
                  Created by{" "}
                  <a
                    className="underline underline-offset-4 hover:text-sky-600"
                    href="https://trevorthewebdeveloper.com/"
                  >
                    Trevor Brown
                  </a>
                </p>
              </div>
              <div className="flex justify-center gap-4">
                {" "}
                {/* Maintained gap */}
                <button
                  className="flex items-center justify-center p-3 border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("login")}
                >
                  Log In
                </button>{" "}
                {/* Adjusted padding */}
                <button
                  className="flex items-center justify-center p-3 border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("register")}
                >
                  Register
                </button>{" "}
                {/* Adjusted padding */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
