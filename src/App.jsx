import PhysiologyWidget from "../physiology_widget.jsx";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const THEME_STORAGE_KEY = "new-hope-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <div className="app-toolbar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <PhysiologyWidget />
    </>
  );
}
