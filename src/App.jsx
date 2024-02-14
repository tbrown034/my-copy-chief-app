// src/App.js
import React, { useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import Game from "./components/UI/Game";
import Home from "./components/UI/Home";
function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode(); // Use the custom hook

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
      />
      {!gameDisplay ? (
        <Home setGameDisplay={setGameDisplay} />
      ) : (
        <Game setGameDisplay={setGameDisplay} />
      )}
      <Footer />
    </div>
  );
}

export default App;
