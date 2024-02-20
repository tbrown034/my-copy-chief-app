import React, { useState } from "react";
import Header from "./components/UI/Layout/Header";
import Home from "./components/UI/Layout/Home";
import Game from "./components/UI/Layout/Game";
import Footer from "./components/UI/Layout/Footer";
import HowTo from "./components/UI/Layout/HowToBox/HowTo";
import { useDarkMode } from "./hooks/useDarkMode";
import SettingsBox from "./components/UI/Shared/SettingsBox";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showHowTo, setShowHowTo] = useState(false);
  const [duration, setDuration] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const [numOfHeadlines, setNumOfHeadlines] = useState(2);

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const handleSetNumOfHeadlines = (num) => {
    setNumOfHeadlines(num);
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
      />
      {!gameDisplay ? (
        <Home toggleHowTo={toggleHowTo} setGameDisplay={setGameDisplay} />
      ) : (
        <Game
          setGameDisplay={setGameDisplay}
          numOfHeadlines={numOfHeadlines}
          duration={duration}
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
        />
      )}
    </div>
  );
}

export default App;
