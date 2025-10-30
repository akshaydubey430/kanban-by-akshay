// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADfLcgSu3ZjDF1XcEGVhiBSMM5UsrLHi0",
  authDomain: "kanban-by-akshay.firebaseapp.com",
  projectId: "kanban-by-akshay",
  storageBucket: "kanban-by-akshay.firebasestorage.app",
  messagingSenderId: "1026626629085",
  appId: "1:1026626629085:web:193d93a763c47d83cc5a34",
  measurementId: "G-X9H2J8GFRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
