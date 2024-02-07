// src/App.js
import React from "react";
import { useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import Game from "./components/UI/Game";
import Home from "./components/UI/Home";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode(); // Use the custom hook
  const [gameMode, setGameMode] = useState(null); // 'latest' or 'popular'

  const startGame = (mode) => {
    setGameMode(mode); // Set the selected game mode
    setGameDisplay(true); // Show the game component
  };

  return (
    <div
      className={`flex flex-col min-h-screen gap-4 p-4 ${
        isDarkMode ? "dark:bg-zinc-700 dark:text-slate-200" : "bg-zinc-200"
      }`}
    >
      <Header
        darkMode={isDarkMode}
        setDarkMode={setDarkMode}
        gameDisplay={gameDisplay}
        setGameDisplay={setGameDisplay}
      />
      {!gameDisplay ? (
        <Home setGameDisplay={setGameDisplay} startGame={startGame} />
      ) : (
        <Game setGameDisplay={setGameDisplay} gameMode={gameMode} />
      )}
      <Footer />
    </div>
  );
}

export default App;
