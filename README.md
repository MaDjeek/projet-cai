# Fonctionnalités implémentées :

## Authentification & Gestion des Utilisateurs

  Connexion avec email/mot de passe
  
  Inscription de nouveaux comptes (prénom, nom, email, mot de passe)
  
  Déconnexion

  Auto-login après inscription réussie
  
  Gestion de 3 rôles : admin, officer, user
  
  Stockage des utilisateurs dans localStorage
  
  Validation des emails existants lors de l'inscription
  
  
## Gestion des Infractions

  Affichage : Liste paginée des infractions (10 par page)
  
  Filtrage : Par type, statut, recherche textuelle dans la description
  
  Tri : Par date (plus récent/plus ancien)
  
  Statistiques : Compteurs par statut
  
  Création : Formulaire de signalement d'infraction
  
  Modification : Édition des infractions (admin/officer uniquement)
  
  Suppression : Suppression d'infractions (admin/officer uniquement)

  Signalement anonyme : Possibilité de signaler sans compte
  
  Signalement identifié : Option pour rester anonyme même connecté
  
  Commentaires : Affichés au clic sur l'infraction
  
  Persistance : Toutes les modifications sauvegardées dans localStorage
  
  
## Contrôle d'Accès (Role-Based Access Control)

  Non authentifiés : Redirection vers page d'accueil, signalement anonyme uniquement
  
  Users : Accès uniquement à leurs propres signalements
  
  Officers/Admins : Accès à toutes les infractions + édition/suppression
  

## Interface Utilisateur

  Page d'accueil :
  
  - Version non connectée : 3 options (connexion, inscription, signalement anonyme)
    
  - Version connectée : Bienvenue personnalisée + accès signalements/création
    
  Header : Navigation avec boutons connexion/inscription ou déconnexion selon l'état
  
  Design responsive : Adaptation mobile/desktop
  
  Badge de statut : Pills colorées (Ouverte, Fermée, En cours, Résolue)
  
  Formulaires stylisés : Connexion, inscription, ajout/édition d'infractions
  
  Pagination : Navigation entre pages d'infractions
  
  Barre de recherche : Design cohérent avec le reste de la page
  

## Persistance des Données

  localStorage : Sauvegarde automatique infractions et utilisateurs
  
  Données mock : Population initiale avec données de test
  
  Synchronisation : Mise à jour automatique après chaque modification
  

## Responsive Design

  Grille adaptative pour les options sur la page d'accueil
  
  Formulaires optimisés mobile
  
  Barre de recherche responsive
