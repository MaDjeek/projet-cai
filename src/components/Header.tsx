"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "./Header.css";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="app-header">
      <div className="app-header-content">
        <h1 className="app-header-title" onClick={() => router.push("/")}>Projet CAI</h1>
        <div className="app-header-actions">
          {isAuthenticated ? (
            <button className="btn-logout" onClick={handleLogout}>
              Se déconnecter
            </button>
          ) : (
            <>
              <button className="btn-login" onClick={handleLogin}>
                Se connecter
              </button>
              <button className="btn-register" onClick={handleRegister}>
                S'inscrire
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
