"use client";

import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header({
  onOpenMobile,
}: {
  onOpenMobile?: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // جلوگیری از hydration mismatch در SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-28 md:h-20 bg-white/60 dark:bg-slate-900 backdrop-blur-2xl rounded-[2.5rem] shadow-sm border border-white/60 flex items-center justify-between px-4 md:px-8">
      <div>
        <div className="text-slate-700 font-bold text-lg dark:text-white">
          Good morning Liz 👋
        </div>
        <div className="text-sm text-slate-400">
          Time to rise up for today’s
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-100 text-slate-600 shadow-sm"
        >
          <Menu size={18} />
        </button>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-slate-600 font-semibold dark:text-white">
            $566.55
          </div>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100">
            <Bell size={18} />
          </button>

          {/* Theme Toggle – فقط بعد از mount رندر میشه */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 border border-slate-100"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <img
            src="/avatar.png"
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
