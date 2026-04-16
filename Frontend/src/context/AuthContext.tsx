import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { users, type User } from "../data/users";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("icog_user");
    if (stored) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("icog_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("icog_user");
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
