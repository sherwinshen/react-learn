import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

function useLocalStorageState(initialState: boolean, key: string) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  };

  return <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
