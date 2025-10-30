import React from "react";
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/kanban");
    } catch (err) {
      console.error("Error signing up:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Welcome to Kanban by Akshay
      </h1>
      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Sign up to start managing your tasks
      </p>
      <button
        onClick={handleGoogleSignUp}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign up with Google
      </button>
    </div>
  );
};
