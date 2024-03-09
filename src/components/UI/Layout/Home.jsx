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
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2 text-center">
        <i className="p-2 text-6xl fa-regular fa-newspaper"></i>
        <h1 className="text-4xl font-bold">CopyChief</h1>
        <h2 className="text-2xl">A Wordle-inspired headline guessing game.</h2>
        <div className="flex flex-col justify-center gap-12 py-8">
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-8 text-center">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleUserAction("profile")}
                  className="text-lg underline-offset-4 hover:underline ring-offset-8"
                >
                  Hello, {displayName}!
                </button>
                <div className="flex justify-center gap-4">
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
                    className="text-sm text-gray-500 hover:underline underline-offset-4"
                  >
                    (Log out)
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="flex items-center justify-center p-2 px-10 text-white bg-black shadow-sm rounded-3xl hover:bg-gray-700 active:bg-gray-500 dark:text-black dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-400 "
                  onClick={playDailyGame}
                >
                  Play
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-2">
                <button
                  className="flex items-center justify-center p-2 px-16 text-lg text-white bg-black shadow-sm rounded-3xl hover:bg-gray-700 active:bg-gray-500 dark:text-black dark:bg-white dark:hover:bg-gray-200 dark:active:bg-gray-400"
                  onClick={playDailyGame}
                >
                  Play
                </button>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("login")}
                >
                  Log In
                </button>
                <button
                  className="flex items-center justify-center p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("register")}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
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
    </>
  );
}
