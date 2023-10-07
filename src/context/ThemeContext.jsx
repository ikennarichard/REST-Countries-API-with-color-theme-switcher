/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState, useEffect } from "react";

export const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  } else {
    return theme;
  }
};

export const ThemeProvider = ({children}) => {

  const [theme, setTheme] = useState(getTheme);

  const toggleDarkMode = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}