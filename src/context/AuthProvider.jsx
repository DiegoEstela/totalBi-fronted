"use client";
import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/db/db";
import FullLoader from "@/app/components/FullLoader/FullLoader";
import Login from "@/app/Login/Login";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user }}>
        {loading ? <FullLoader /> : user ? <>{children} </> : <Login />}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
