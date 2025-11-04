"use client";
import React from "react";

export const Navbar = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md dark:from-gray-800 dark:to-gray-700">
      <div className="text-2xl font-semibold tracking-wide">
        Kanban by Akshay
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1.5 bg-white/10 rounded-md hover:bg-white/20 text-sm"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
          A
        </div>
      </div>
    </nav>
  );
};
