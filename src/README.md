# 💪 GAINS AT HOME - Workout & Running App with Strava Integration

Application complète d’entraînement à domicile avec intégration Strava pour synchroniser tes running sessions.

## Features

✅ **Workout Program** - 4 jours d’entraînement (Poitrine/Triceps, Dos/Biceps, Jambes, Épaules)
✅ **Running Program** - 4 sessions par semaine avec distances et allures
✅ **Strava Integration** - Sync auto de tes running sessions sur Strava
✅ **Session Tracking** - Suivi de tes séances complétées
✅ **Responsive Design** - Fonctionne sur mobile, tablette, desktop

## Installation

### Prerequisites

- Node.js (v14+)
- npm ou yarn
- Compte Strava (pour l’intégration)

### 1. Clone le repo

```bash
git clone https://github.com/[TON_USERNAME]/gains-at-home.git
cd gains-at-home
```

### 2. Setup Strava OAuth

1. Va sur https://www.strava.com/settings/api
1. Crée une nouvelle application
1. Note ton **Client ID** et **Client Secret**
1. Ajoute ces URIs de redirection:
- `http://localhost:3001/auth/strava/callback` (développement)
- `https://gains-at-home-backend.herokuapp.com/auth/strava/callback` (production)

### 3. Install dependencies

```bash
npm install
```

### 4. Setup environment variables

Crée un fichier `.env` à la racine:

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

Et un fichier `.env.local` pour le backend (server.js):

```
STRAVA_CLIENT_ID=ton_client_id_ici
STRAVA_CLIENT_SECRET=ton_client_secret_ici
STRAVA_REDIRECT_URI=http://localhost:3001/auth/strava/callback
PORT=3001
```

### 5. Démarre le backend et l’app

**Terminal 1 - Backend:**

```bash
npm install express axios cors dotenv
node server.js
```

**Terminal 2 - React App:**

```bash
npm start
```

L’app ouvre sur `http://localhost:3000` et le backend tourne sur `http://localhost:3001`.

## Utilisation

### Workout Tab

1. Sélectionne ton jour d’entraînement
1. Clique sur les exercices pour voir les détails
1. Marque comme complété quand c’est fait
1. Valide la séance entière

### Running Tab

1. **Connecte Strava** en haut à droite
1. Clique sur le bouton ○ pour lancer une session
1. Va dans Strava et enregistre ta course
1. Reviens et clique ▶ pour confirmer
1. L’app sync automatiquement sur Strava

## Déploiement sur GitHub Pages + Heroku

### Frontend (GitHub Pages)

```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://[TON_USERNAME].github.io/gains-at-home",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

### Backend (Heroku)

1. Crée un compte Heroku
1. Install Heroku CLI
1. Crée un `Procfile` à la racine:

```
web: node server.js
```

1. Deploy:

```bash
heroku login
heroku create gains-at-home-backend
heroku config:set STRAVA_CLIENT_ID=ton_id
heroku config:set STRAVA_CLIENT_SECRET=ton_secret
heroku config:set STRAVA_REDIRECT_URI=https://gains-at-home-backend.herokuapp.com/auth/strava/callback
git push heroku main
```

1. Mets à jour le `.env` sur GitHub Pages:

```
REACT_APP_BACKEND_URL=https://gains-at-home-backend.herokuapp.com
```
