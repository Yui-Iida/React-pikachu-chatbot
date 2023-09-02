import { useRef, useState } from "react";

export default function Header({ isDarkMode, setIsDarkMode }) {
  const [modeText, setModeText] = useState(isDarkMode ? "☀️" : "☽");
  const switchModeRef = useRef(null);

  const handleMode = () => {
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      setModeText("☀️");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setModeText("☽");
      setIsDarkMode(false);
    }
  };

  return (
    <header className="header h-20 w-screen bg-white flex items-center top-0 left-0 right-0 fixed flex-none z-10 dark:bg-black">
      <div className="flex pl-6 pr-6 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img src="/img/img-pikachu.PNG" alt="pikachu icon" className="h-10" />
          <p className="text-lg dark:text-white">Pikachu</p>
        </div>
        <button type="button">
          <p
            className="text-gray-300 mr-2 text-xl"
            ref={switchModeRef}
            onClick={handleMode}
          >
            {modeText}
          </p>
        </button>
      </div>
    </header>
  );
}
