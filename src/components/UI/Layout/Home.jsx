import React from "react";
import CurrentDate from "../Shared/CurrentDate";
import { auth } from "../../../config/Firebase";
import { signOut } from "firebase/auth";

export default function Home({
  setShowHowTo,
  handleUserAction,
  isLoggedIn,
  user,
  playDailyGame,
  addDailyGametoDb,
}) {
  const handleStart = () => {
    setShowHowTo(true);
  };

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
                <p className="text-lg underline ring-offset-8">
                  Hello, {displayName}!
                </p>
                <p
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        console.log("Signed out successfully");
                      })
                      .catch((error) => {
                        console.error("Sign out error", error);
                      });
                  }}
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  (Log out)
                </p>
                <button
                  className="flex items-center justify-center p-2 px-4 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("profile")}
                >
                  View Profile
                </button>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="flex items-center justify-center p-2 px-10 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={handleStart}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Start
                </button>
                <button
                  className="flex items-center justify-center p-2 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={playDailyGame}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Daily Game
                </button>
                <button
                  className="flex items-center justify-center p-2 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={addDailyGametoDb}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Add Game to Db
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <div className="flex justify-center gap-2">
                <button
                  className="flex items-center justify-center p-2 px-10 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={handleStart}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Start
                </button>
                <button
                  className="flex items-center justify-center p-2 px-10 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={playDailyGame}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Play Daily Game
                </button>
                <button
                  className="flex items-center justify-center p-2 text-xl bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={addDailyGametoDb}
                >
                  <i className="mr-2 fa-regular fa-play"></i> Add Game to Db
                </button>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="flex items-center justify-center p-2 px-4 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("login")}
                >
                  <i className="mr-2 fas fa-sign-in-alt"></i> Log In
                </button>
                <button
                  className="flex items-center justify-center p-2 px-4 bg-transparent border-2 border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                  onClick={() => handleUserAction("register")}
                >
                  <i className="mr-2 fas fa-user-plus"></i> Register
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
