import Footer from "./components/UI/Footer";
import Header from "./components/UI/Header";
import Game from "./components/UI/Game";
import Home from "./components/UI/Home";
import { useState, useEffect } from "react";

function App() {
  const [gameDisplay, setGameDisplay] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]); // Re-run when darkMode changes

  return (
    <div className="flex flex-col min-h-screen gap-4 p-4 dark:bg-zinc-700 dark:text-slate-200 bg-zinc-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
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
