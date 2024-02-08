import Toggle from "./Toggle";

export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
}) {
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(!gameDisplay);
    }
  };

  return (
    <div className="flex justify-between p-2 border-b-2 border-opacity-20 border-b-black">
      <div className="flex items-center gap-2 text-4xl ">
        <a
          onClick={backToHome}
          className="font-bold font-zillaSlab hover:cursor-pointer "
        >
          CopyChief
        </a>
      </div>
      <div className="flex items-center justify-center gap-2 text-2xl">
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-solid fa-gear"></i>

        <Toggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}
