//app.jsx

import React, { useState } from "react";
import Header from "./components/UI/Header";
import Home from "./components/UI/Home";
import Game from "./components/UI/Game";
import Footer from "./components/UI/Footer";
import HowTo from "./components/UI/HowTo";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const [showHowTo, setShowHowTo] = useState(false);

  const [numOfHeadlines, setNumOfHeadlines] = useState(2);

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const handleSetNumOfHeadlines = (num) => {
    setNumOfHeadlines(num);
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
        gameDisplay={gameDisplay}
        setGameDisplay={setGameDisplay}
        toggleHowTo={toggleHowTo}
      />
      {!gameDisplay ? (
        <Home toggleHowTo={toggleHowTo} setGameDisplay={setGameDisplay} />
      ) : (
        <Game setGameDisplay={setGameDisplay} numOfHeadlines={numOfHeadlines} />
      )}
      <Footer />
      {showHowTo && (
        <HowTo
          toggleHowTo={toggleHowTo}
          handleSetNumOfHeadlines={handleSetNumOfHeadlines}
          setNumOfHeadlines={setNumOfHeadlines}
        />
      )}
    </div>
  );
}

export default App;
