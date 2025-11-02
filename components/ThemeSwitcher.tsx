"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "system";

/**
 * Advanced theme switcher with smooth transitions
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Add transition class
    root.classList.add("theme-transition");

    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      root.classList.toggle("light", !prefersDark);
    } else {
      root.classList.toggle("dark", newTheme === "dark");
      root.classList.toggle("light", newTheme === "light");
    }

    // Remove transition class after animation
    setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    localStorage.setItem("theme", newTheme);
  };

  const cycleTheme = () => {
    const themes: Theme[] = ["dark", "light", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length]!;
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) return null;

  const icons = {
    dark: Moon,
    light: Sun,
    system: Monitor,
  };

  const Icon = icons[theme];

  return (
    <motion.button
      onClick={cycleTheme}
      className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl transition-colors hover:bg-white/10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5 text-white" />
        </motion.div>
      </AnimatePresence>

      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-full mb-2 rounded-lg bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        {theme === "dark" && "Dark Mode"}
        {theme === "light" && "Light Mode"}
        {theme === "system" && "System Theme"}
      </div>
    </motion.button>
  );
}
