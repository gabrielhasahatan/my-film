"use client"

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const authContext = createContext<{ user: User | null } | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => subscribe();
  }, []);

  return (<authContext.Provider value={{ user: currentUser }} >
    {children}
  </authContext.Provider>)
}

export const useUserAuthenticationContext = () => {
  const ctx = useContext(authContext)
  if (!ctx) {
    throw new Error("useUserAuthenticationContext harus digunakan didalam AuthProvider")
  } else {
    return ctx
  }
}


export default AuthProvider
