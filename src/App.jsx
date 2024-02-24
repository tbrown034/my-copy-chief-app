import React, { useState } from "react";
import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import Game from "./components/UI/Layout/Game";
import Footer from "./components/UI/Layout/Footer";
import HowTo from "./components/UI/Layout/HowToBox/HowTo";
import { useDarkMode } from "./hooks/useDarkMode";
import SettingsBox from "./components/UI/Shared/SettingsBox";
import AboutBox from "./components/UI/Layout/AboutBox";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showHowTo, setShowHowTo] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [numOfHeadlines, setNumOfHeadlines] = useState(2);

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const handleSetNumOfHeadlines = (num) => {
    setNumOfHeadlines(num);
  };

  const toggleAbout = () => {
    // If the How To dialog is open, close it first.
    if (showHowTo) {
      setShowHowTo(false); // Close the How To dialog.

      // Wait for the state update to complete before opening the About dialog.
      setTimeout(() => {
        setShowAbout(true); // Open the About dialog.
      }, 0); // Using a timeout of 0 to defer this operation until after the state update.
    } else {
      // If the How To dialog is not open, toggle the About dialog directly.
      setShowAbout((prev) => !prev);
    }
  };

  function handleDifficultyChange(value) {
    setNumOfHeadlines(value); // Apply the selected difficulty
  }

  function handleDurationChange(value) {
    console.log(`Setting duration to: ${value}`);

    setDuration(value); // Apply the selected duration
  }

  function toggleSettings() {
    setShowSettings((prev) => {
      console.log("Toggling Settings: ", !prev); // Add this line for debugging
      return !prev;
    });
  }

  const playGame = () => {
    setGameDisplay(true);
    toggleHowTo();
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
      />
      {!gameDisplay ? (
        <Home
          toggleHowTo={toggleHowTo}
          playGame={playGame}
          setGameDisplay={setGameDisplay}
        />
      ) : (
        <Game
          setGameDisplay={setGameDisplay}
          numOfHeadlines={numOfHeadlines}
          duration={duration}
          playGame={playGame}
        />
      )}
      <Footer />
      {showHowTo && (
        <HowTo
          setDuration={setDuration}
          duration={duration}
          toggleHowTo={toggleHowTo}
          handleSetNumOfHeadlines={handleSetNumOfHeadlines}
          setNumOfHeadlines={setNumOfHeadlines}
          numOfHeadlines={numOfHeadlines}
          handleDurationChange={handleDurationChange}
          toggleAbout={toggleAbout}
          playGame={playGame}
        />
      )}
      {showAbout && <AboutBox toggleAbout={toggleAbout} />}
    </div>
  );
}

export default App;
