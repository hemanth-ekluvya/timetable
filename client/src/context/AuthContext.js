// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (u) => {
    setUser(u);
    sessionStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
