"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import themes from "../styles/Themes";
import { type ITheme } from "../types";

const ThemeContext = createContext({
  theme: themes[0] as ITheme,
  rotateTheme: () => {null},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(themes[0] as ITheme); 

  function setThemeByName(name: string) {
    const theme = themes.find((theme) => theme.name === name);
    if (theme) setTheme(theme);
  }

  function rotateTheme() {
    const index = themes.indexOf(theme);
    const nextIndex = index + 1 === themes.length ? 0 : index + 1;
    const nextTheme = themes[nextIndex] as ITheme;
    if (nextTheme) {
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme.name);
    }
    console.log("theme", nextTheme);
  }

  useEffect(() => {
    const checkLocalStorage = () => {
      const theme = localStorage.getItem("theme");
      if (theme) setThemeByName(theme);
    };
    if (!theme) checkLocalStorage();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, rotateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
