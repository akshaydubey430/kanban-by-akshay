import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";

export default function AuthForm({
  onLogin,
}: {
  onLogin: (user: any) => void;
}) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        onLogin(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        onLogin(result.user);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          {isSignup ? "Create an Account" : "Welcome Back 👋"}
        </h2>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm dark:text-white focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            onClick={handleEmailAuth}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <div className="text-sm text-gray-500 dark:text-gray-300 my-2">
            or
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
