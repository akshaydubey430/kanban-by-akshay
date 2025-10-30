import React, { useState, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { KanbanBoard } from "./components/KanbanBoard/KanbanBoard";
import { useKanbanBoard } from "./hooks/useKanbanBoard";
import { sampleColumns, sampleTasks } from "./sample-data";
import Login from "./components/Auth/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import AuthForm from "./components/Auth/AuthForm";
import { onAuthStateChanged } from "firebase/auth";

function Navbar({ darkMode, toggleDarkMode, user, onLogout }) {
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
        {user && (
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-white/10 rounded-md hover:bg-white/20 text-sm"
          >
            🚪 Logout
          </button>
        )}
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
          {user?.displayName?.charAt(0) || "A"}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔒 Check Firebase auth state persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ stop showing loader once Firebase responds
    });
    return () => unsubscribe();
  }, []);

  // 🧩 Kanban state
  const {
    columns,
    tasks,
    onTaskMove,
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete,
  } = useKanbanBoard(sampleColumns, sampleTasks);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // 🔍 Search/filter logic
  const filteredTasks = useMemo(() => {
    if (!query.trim()) return tasks;
    const q = query.toLowerCase();
    const result: typeof tasks = {};
    for (const id in tasks) {
      const t = tasks[id];
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchTag = t.tags?.some((tag) => tag.toLowerCase().includes(q));
      if (matchTitle || matchTag) result[id] = t;
    }
    return result;
  }, [query, tasks]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🚀 Loading screen while Firebase checks login
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 mb-4"></div>
        <p className="text-gray-700 dark:text-gray-300">Loading Kanban...</p>
      </div>
    );
  }

  // 🔑 If not logged in — show auth page
  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  // ✅ If logged in — show full Kanban
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-neutral-50 to-blue-50"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-8 text-neutral-900 dark:text-gray-100">
        {/* 🔍 Search Bar */}
        <div className="max-w-2xl mx-auto mb-6 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search tasks by title or tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="px-3 py-2 bg-red-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-gray-600"
            >
              ✖ Clear
            </button>
          )}
        </div>

        <div className="max-w-full overflow-x-auto">
          <KanbanBoard
            columns={columns}
            tasks={filteredTasks}
            onTaskMove={onTaskMove}
            onTaskCreate={onTaskCreate}
            onTaskUpdate={onTaskUpdate}
            onTaskDelete={onTaskDelete}
          />
        </div>
      </main>

      <footer className="text-center py-3 text-sm text-neutral-500 border-t dark:border-gray-700 dark:text-gray-400">
        © 2025 Kanban by Akshay — Organized productivity.
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
