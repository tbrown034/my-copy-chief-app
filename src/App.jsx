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
  const [difficulty, setDifficulty] = useState("2");
  const [section, setSection] = useState(2);

  const difficultyOptions = [
    { name: "Easy", value: "1" },
    { name: "Medium (Default)", value: "2" },
    { name: "Hard", value: "3" },
    { name: "Very Hard", value: "4" },
  ];

  const sectionOptions = [
    { name: "Home", value: "home" },
    { name: "Sports", value: "sports" },
    { name: "Arts", value: "arts" },
    { name: "Opinion", value: "opinion" },
  ];

  const toggleHowTo = () => setShowHowTo((prev) => !prev);
  const changeSection = (value) => setSection(value);
  const changeDifficulty = (value) => setDifficulty(value);

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
        changeDifficulty={changeDifficulty}
        changeSection={changeSection}
        difficulty={difficulty}
        section={section}
      />
      {!gameDisplay ? (
        <Home
          toggleHowTo={toggleHowTo}
          difficulty={difficulty}
          setGameDisplay={setGameDisplay}
        />
      ) : (
        <Game
          toggleHowTo={toggleHowTo}
          setGameDisplay={setGameDisplay}
          difficulty={difficulty}
        />
      )}
      <Footer />
      {showHowTo && (
        <HowTo
          toggleHowTo={toggleHowTo}
          changeSection={changeSection}
          changeDifficulty={changeDifficulty}
          difficulty={difficulty}
          section={section}
          difficultyOptions={difficultyOptions}
          sectionOptions={sectionOptions}
        />
      )}
    </div>
  );
}

export default App;
