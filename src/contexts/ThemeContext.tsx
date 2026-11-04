import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleDark: () => void;
  setDark: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggleDark: () => {}, setDark: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("otto-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("otto-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
