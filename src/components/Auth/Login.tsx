import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Welcome 👋
        </h2>
        <p className="text-sm text-gray-500 mb-6 dark:text-gray-300">
          Sign in to access your Kanban board
        </p>
        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
