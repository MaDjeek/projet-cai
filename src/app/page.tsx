"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import "./home.css";

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isAuthenticated && user) {
    return (
      <div className="home-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Bienvenue {user.firstName}</h1>
          <p className="welcome-subtitle">
            Système de Signalement des Infractions
          </p>
          <p className="welcome-description">
            Aidez-nous à maintenir un environnement sûr en signalant les infractions.
            Consultez les infractions signalées ou contribuez vous-même.
          </p>
        </div>

        <div className="options-grid">
          <div className="option-card infractions-card">
            <div className="option-icon">🔍</div>
            <h2>Consulter vos signalements</h2>
            <button 
              className="option-button infractions-button"
              onClick={() => router.push("/infractions")}
            >
              Consulter
            </button>
          </div>

          <div className="option-card report-card">
            <div className="option-icon">🚨</div>
            <h2>Signaler une infraction</h2>
            <button 
              className="option-button report-button"
              onClick={() => router.push("/report")}
            >
              Signaler
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3>Pourquoi signaler?</h3>
          <ul className="info-list">
            <li>✓ Contribuez à la sécurité de la communauté</li>
            <li>✓ Votre signalement peut faire la différence</li>
            <li>✓ Restez anonyme si vous le souhaitez</li>
            <li>✓ Consultez l'historique des infractions</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenue</h1>
        <p className="welcome-subtitle">
          Système de Signalement des Infractions
        </p>
        <p className="welcome-description">
          Aidez-nous à maintenir un environnement sûr en signalant les infractions.
          Consultez les infractions signalées ou contribuez vous-même.
        </p>
      </div>

      <div className="options-grid">
        <div className="option-card login-card">
          <div className="option-icon">🔐</div>
          <h2>Se Connecter</h2>
          <p>Accédez à votre compte pour consulter et gérer vos signalements.</p>
          <button 
            className="option-button login-button"
            onClick={() => router.push("/auth/login")}
          >
            Se Connecter
          </button>
        </div>

        <div className="option-card signup-card">
          <div className="option-icon">✍️</div>
          <h2>S'Inscrire</h2>
          <p>Créez un compte pour accéder à toutes les fonctionnalités et signaler des infractions.</p>
          <button 
            className="option-button signup-button"
            onClick={() => router.push("/auth/register")}
          >
            S'Inscrire
          </button>
        </div>

        <div className="option-card anonymous-card">
          <div className="option-icon">👤</div>
          <h2>Signaler Anonymement</h2>
          <p>Signalez une infraction de manière anonyme sans créer de compte.</p>
          <button 
            className="option-button anonymous-button"
            onClick={() => router.push("/report")}
          >
            Signaler Anonymement
          </button>
        </div>
      </div>

      <div className="info-section">
        <h3>Pourquoi signaler?</h3>
        <ul className="info-list">
          <li>✓ Contribuez à la sécurité de la communauté</li>
          <li>✓ Votre signalement peut faire la différence</li>
          <li>✓ Restez anonyme si vous le souhaitez</li>
          <li>✓ Consultez l'historique des infractions</li>
        </ul>
      </div>
    </div>
  );
}
