"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/Auth";
import { mockUsers } from "@/data/mockUsers";

const USERS_KEY = "mock_users";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Seed localStorage with mock users if missing or invalid
  useEffect(() => {
    const stored = localStorage.getItem(USERS_KEY);
    let shouldUpdate = false;

    if (!stored) {
      shouldUpdate = true;
    } else {
      try {
        const parsed = JSON.parse(stored);
        // Check if stored data has the correct structure
        if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].firstName) {
          shouldUpdate = true;
        }
      } catch {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    }
  }, []);

  // Simulated login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate an API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          const stored = localStorage.getItem(USERS_KEY);
          let users = mockUsers;

          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              users = parsed;
            }
          }

          const found = users.find((u) =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );

          if (found) {
            const { password: _pw, ...safeUser } = found;
            setUser(safeUser as User);
            setIsAuthenticated(true);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error("Login error:", error);
          resolve(false);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    });
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
    isLoading
  }), [user, isAuthenticated, login, logout, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};