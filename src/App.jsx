import React, { useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import Game from "./components/UI/Game";
import Home from "./components/UI/Home";
import HowTo from "./components/UI/HowTo";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode(); // Use the custom hook
  const [showHowTo, setShowHowTo] = useState(false);
  const [numOfNewsArticles, setnumOfNewsArticles] = useState();

  const toggleHowTo = () => {
    setShowHowTo((prev) => !prev); // Use functional update for guaranteed current state
  };

  const chooseNumOfheadlines = (num) => {
    setnumOfNewsArticles(num);
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
        toggleHowTo={toggleHowTo} // Pass the handler to the Header
      />
      {!gameDisplay ? (
        <Home
          toggleHowTo={toggleHowTo}
          numOfNewsArticles
          setGameDisplay={setGameDisplay}
        />
      ) : (
        <Game
          toggleHowTo={toggleHowTo}
          setGameDisplay={setGameDisplay}
          numOfNewsArticles={numOfNewsArticles}
        />
      )}
      <Footer />
      {showHowTo && (
        <HowTo
          chooseNumOfheadlines={chooseNumOfheadlines}
          toggleHowTo={toggleHowTo}
          numOfNewsArticles={numOfNewsArticles}
        />
      )}{" "}
      // Moved outside the main div and conditionally rendered
    </div>
  );
}

export default App;
