import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "./SignupForm.css";

interface SignupFormProps {
  onCancel: () => void;
}

const USERS_KEY = "mock_users";

const SignupForm: React.FC<SignupFormProps> = ({ onCancel }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { isLoading, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Check if email already exists
    try {
      const stored = localStorage.getItem(USERS_KEY);
      const users = stored ? JSON.parse(stored) : [];

      const emailExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setError("Un compte avec cet email existe déjà");
        return;
      }

      // Add new user to localStorage
      const newUser = {
        id: String(Math.max(...users.map((u: any) => parseInt(u.id)), 0) + 1),
        firstName,
        lastName,
        email,
        password,
        role: "user" // Default role for new users
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Auto-login the user
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        router.push("/");
      } else {
        setError("Erreur lors de la connexion automatique");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-box">
        <h1>Projet CAI</h1>
        <h2>Inscription</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Entrez votre prénom"
                disabled={isLoading}
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Entrez votre nom"
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
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
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;