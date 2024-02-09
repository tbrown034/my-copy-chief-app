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
    <div className="flex justify-between p-2 pb-6 border-b-2 border-opacity-20 border-b-black dark:border-b-white dark:border-opacity-20">
      <a
        onClick={backToHome}
        className="flex items-center gap-2 text-4xl font-bold font-zillaSlab hover:cursor-pointer "
      >
        <i className="p-2 fa-regular fa-newspaper rounded-2xl"></i>

        <div className="">CopyChief</div>
      </a>
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
