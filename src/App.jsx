import React, { useEffect, useState } from "react";
import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import GameBoard from "./components/UI/Layout/GameBoard";
import Footer from "./components/UI/Layout/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/Firebase";
import SettingsBox from "./components/UI/Modals/SettingBoxes/SettingsBox";
import AboutBox from "./components/UI/Modals/AboutBox";
import HowToBox from "./components/UI/Modals/HowToBox/HowToBox";
import UserMenuBox from "./components/UI/Modals/UserMenuBox/UserMenuBox";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showHowTo, setShowHowTo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [numOfHeadlines, setNumOfHeadlines] = useState(2);
  const [showUserMenu, setUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuView, setUserMenuView] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserAction = (action) => {
    // Enhancing the function to handle more scenarios
    if (isLoggedIn && (action === "login" || action === "register")) {
      console.log("Error: You are already logged in.");
      return; // Prevent showing login/register if already logged in
    }

    if (!isLoggedIn && action === "profile") {
      console.log("Error: You must be logged in to view your profile.");
      return; // Prevent showing profile if not logged in
    }

    // This allows us to open the UserMenuBox with the correct content based on the user action
    setUserMenu(true);
    setUserMenuView(action);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        setUserMenu(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const handleSetNumOfHeadlines = (num) => setNumOfHeadlines(num);
  const toggleAbout = () => setShowAbout((prev) => !prev);
  const handleDifficultyChange = (value) => setNumOfHeadlines(value);
  const handleDurationChange = (value) => setDuration(value);
  const toggleSettings = () => setShowSettings((prev) => !prev);
  const toggleUserMenu = () => setUserMenu((prev) => !prev);

  const playGame = () => {
    setGameDisplay(true);
    setShowHowTo(false);
    setShowSettings(false);
  };

  const restartGame = () => {
    setGameDisplay(false);
    setTimeout(() => setGameDisplay(true), 0);
  };

  return (
    <div
      className={`flex flex-col min-h-screen justify-between gap-4 p-4 ${
        isDarkMode ? "dark:bg-zinc-900 dark:text-white" : ""
      }`}
    >
      <Header
        darkMode={isDarkMode}
        setDarkMode={setDarkMode}
        toggleSettings={toggleSettings}
        gameDisplay={gameDisplay}
        setGameDisplay={setGameDisplay}
        toggleHowTo={toggleHowTo}
        handleDurationChange={handleDurationChange}
        handleDifficultyChange={handleDifficultyChange}
        setNumOfHeadlines={setNumOfHeadlines}
        setDuration={setDuration}
        playGame={playGame}
        toggleAbout={toggleAbout}
        isLoggedIn={isLoggedIn}
        handleUserAction={handleUserAction}
      />
      {!gameDisplay ? (
        <Home
          setShowHowTo={setShowHowTo}
          isLoggedIn={isLoggedIn}
          handleUserAction={handleUserAction}
          user={user}
        />
      ) : (
        <GameBoard
          setGameDisplay={setGameDisplay}
          numOfHeadlines={numOfHeadlines}
          duration={duration}
          playGame={playGame}
        />
      )}
      <Footer
        toggleAbout={toggleAbout}
        toggleHowToPlay={toggleHowTo}
        toggleSettings={toggleSettings}
      />
      {showHowTo && (
        <HowToBox
          setDuration={setDuration}
          duration={duration}
          toggleHowTo={toggleHowTo}
          handleSetNumOfHeadlines={handleSetNumOfHeadlines}
          setNumOfHeadlines={setNumOfHeadlines}
          numOfHeadlines={numOfHeadlines}
          handleDurationChange={handleDurationChange}
          toggleAbout={toggleAbout}
          playGame={playGame}
          showHowTo={showHowTo}
          isDarkMode={isDarkMode}
          handleDifficultyChange={handleDifficultyChange}
        />
      )}
      {showAbout && <AboutBox toggleAbout={toggleAbout} />}
      {showSettings && (
        <SettingsBox
          handleDifficultyChange={handleDifficultyChange}
          handleDurationChange={handleDurationChange}
          duration={duration}
          numOfHeadlines={numOfHeadlines}
          toggleSettings={toggleSettings}
          playGame={playGame}
          showHowTo={showHowTo}
          isDarkMode={isDarkMode}
        />
      )}
      {showUserMenu && (
        <UserMenuBox
          toggleUserMenu={toggleUserMenu}
          userMenuView={userMenuView}
          setUserMenuView={setUserMenuView}
          handleLogOut={handleLogOut}
        />
      )}
    </div>
  );
}

export default App;
