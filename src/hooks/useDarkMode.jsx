// src/hooks/useDarkMode.js
import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "";
  }, [isDarkMode]);

  return [isDarkMode, setDarkMode];
};
