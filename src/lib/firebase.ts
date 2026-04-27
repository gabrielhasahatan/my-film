import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSu0VLVdWkD-MmJgRaxNj1et3Ilgx_HcE",
  authDomain: "my-film-132a4.firebaseapp.com",
  projectId: "my-film-132a4",
  storageBucket: "my-film-132a4.firebasestorage.app",
  messagingSenderId: "505335755056",
  appId: "1:505335755056:web:e2ba089b037d898c2558f5",
  measurementId: "G-QTP209B9DY"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
auth.languageCode = "en"
export { app, auth }
