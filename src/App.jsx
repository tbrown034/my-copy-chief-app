import React, { useState } from "react";

import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import GameBoard from "./components/UI/Layout/GameBoard";
import Footer from "./components/UI/Layout/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
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

  const toggleHowTo = () => {
    console.log("Toggling HowTo Modal");
    setShowHowTo((prev) => !prev);
  };
  const handleSetNumOfHeadlines = (num) => {
    console.log(`Setting Number of Headlines to: ${num}`);
    setNumOfHeadlines(num);
  };

  const toggleAbout = () => {
    console.log("Toggling About Modal");
    if (showHowTo) {
      setShowHowTo(false);
      setTimeout(() => {
        setShowAbout(true);
      }, 0);
    } else {
      setShowAbout((prev) => !prev);
    }
  };

  function handleDifficultyChange(value) {
    console.log(`Changing Difficulty to: ${value}`);
    setNumOfHeadlines(value);
  }

  function handleDurationChange(value) {
    console.log(`Setting Duration to: ${value}`);
    setDuration(value);
  }

  function toggleSettings() {
    console.log("Toggling Settings Modal");
    setShowSettings((prev) => {
      console.log("Toggling Settings: ", !prev); // Add this line for debugging
      return !prev;
    });
  }

  function toggleUserMenu() {
    setUserMenu((prev) => {
      console.log("toggling user menu");
      return !prev;
    });
  }

  // In App component
  const playGame = () => {
    setGameDisplay(true); // Display the game board
    if (showHowTo) {
      setShowHowTo(false);
    }
    if (showSettings) {
      setShowSettings(false);
    }
  };

  const restartGame = () => {
    console.log("Restarting game...");
    // Add logic here if you need to reset any game state before restarting
    setGameDisplay(false); // This might seem counterintuitive, but if you need to reset the state,
    setTimeout(() => {
      setGameDisplay(true); // Re-display the game board
    }, 0); // Using setTimeout to ensure state updates are processed in order
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
        toggleUserMenu={toggleUserMenu}
      />
      {!gameDisplay ? (
        <Home setShowHowTo={setShowHowTo} />
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
      {showUserMenu && <UserMenuBox toggleUserMenu={toggleUserMenu} />}
    </div>
  );
}

export default App;
