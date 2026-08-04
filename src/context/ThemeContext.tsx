"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ostrax_theme_mode");
      if (saved === "dark" || saved === "light") {
        setMode(saved as ThemeMode);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to localStorage & apply DOM changes
  useEffect(() => {
    const root = document.documentElement;

    // Apply Mode classes
    root.classList.remove("theme-light", "theme-dark", "dark");
    if (mode === "dark") {
      root.classList.add("dark", "theme-dark");
    } else {
      root.classList.add("theme-light");
    }

    try {
      localStorage.setItem("ostrax_theme_mode", mode);
    } catch (e) {
      console.error(e);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
