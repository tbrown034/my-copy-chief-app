export default function Header({
  darkMode,
  setDarkMode,
  setGameDisplay,
  gameDisplay,
}) {
  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  const backToHome = () => {
    if (gameDisplay) {
      setGameDisplay(!gameDisplay);
    }
  };

  return (
    <div className="flex justify-between p-2 border-b-2 border-opacity-20 border-b-black">
      <div className="flex items-center gap-2 text-2xl ">
        <i className="fa-solid fa-bars "></i>
        <div onClick={backToHome} className="font-bold hover:cursor-pointer ">
          <span>Copy</span>
          <span>Chief</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <i class="fa-regular fa-circle-question text-2xl"></i>
        <button
          onClick={handleClick}
          className="p-2 text-xs text-white bg-sky-800 hover:bg-sky-700 active:bg-sky-600 rounded-xl"
        >
          Light/Dark Mode
        </button>
      </div>
    </div>
  );
}
