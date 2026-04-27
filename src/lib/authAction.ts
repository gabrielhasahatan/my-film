import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const signInGoogle = () => {
  signInWithPopup(auth, googleProvider)
}

export const logout = async () => {
  signOut(auth)
}
