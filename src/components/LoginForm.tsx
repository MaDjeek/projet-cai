import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./LoginForm.css";

interface LoginFormProps {
    onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = await login(email, password);

    if (!success) {
      setError("Email ou mot de passe inconnu");
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <h1>Projet CAI</h1>
        <h2>Connexion</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@exemple.com"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            Annuler
          </button>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;