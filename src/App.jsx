import { useState } from "react";
import MainMenu from "./components/UI/MainMenu";
import GameMenu from "./components/UI/GameMenu";
function App() {
  const [showGameMenu, setShowGameMenu] = useState(false);

  const startGame = () => {
    setShowGameMenu(true);
  };

  const backToMenu = () => {
    setShowGameMenu(false);
  };

  return (
    <div className="p-2 px-4 bg-zinc-200">
      {!showGameMenu ? (
        <MainMenu startGame={startGame} />
      ) : (
        <GameMenu backToMenu={backToMenu} />
      )}
    </div>
  );
}

export default App;
