import React, { useState } from "react";

import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import GameBoard from "./components/UI/Layout/GameBoard";
import Footer from "./components/UI/Layout/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import SettingsBox from "./components/UI/Modals/SettingsBox";
import AboutBox from "./components/UI/Modals/AboutBox";
import HowToBox from "./components/UI/Modals/HowToBox/HowToBox";

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
    setNumOfHeadlines(value);
  }

  function handleDurationChange(value) {
    console.log(`Setting duration to: ${value}`);

    setDuration(value);
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
        toggleAbout={toggleAbout}
      />
      {!gameDisplay ? (
        <Home
          toggleHowTo={toggleHowTo}
          playGame={playGame}
          setGameDisplay={setGameDisplay}
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
        />
      )}
      {showAbout && <AboutBox toggleAbout={toggleAbout} />}
    </div>
  );
}

export default App;
