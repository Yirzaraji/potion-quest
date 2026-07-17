# 🧪 Potion Quest

**Potion Quest** est un jeu de gestion et de craft dans lequel le joueur incarne un alchimiste. 
Il faut acheter des ingrédients dans la boutique, les stocker dans son inventaire, suivre des recettes 
pour concocter des potions, remplir des quêtes et faire progresser son profil.

---

## 🚀 Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur (recommandé : v20+)
- [npm](https://www.npmjs.com/) (installé avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Yirzaraji/potion-quest.git
cd potion-quest

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le projet sera accessible à l'adresse indiquée dans le terminal (généralement `http://localhost:5173`).

### Autres commandes disponibles

```bash
npm run build     # Génère la version de production dans /dist
npm run preview   # Prévisualise le build de production en local
npm run lint      # Analyse le code avec ESLint
```

---

## ✨ Fonctionnalités

- **Boutique (Shop)** — achat d'ingrédients et de potions contre de l'or.
- **Inventaire (Inventaire)** — gestion des objets possédés, vente et transformation d'items.
- **Recettes (Recettes)** — consultation des recettes de craft disponibles.
- **Quêtes (Quete)** — suivi des objectifs et missions du joueur.
- **Profil (Profil)** — informations et progression du personnage (niveau, etc.).
- **Aide (Aides)** — panneau d'assistance pour le joueur.
- **Fenêtres multi-instances** — chaque module s'ouvre dans sa propre fenêtre, déplaçable à la souris (clic gauche maintenu sur l'en-tête) et fermable via une croix, sans fermer les autres fenêtres ouvertes.
- **Lecteur audio intégré** (`MusicPlayer`) — musique d'ambiance jouée pendant la partie.

---

## 🛠️ Stack technique

| Catégorie              | Technologie                                                        |
|------------------------|---------------------------------------------------------------------|
| Framework UI           | [React 18](https://react.dev/)                                     |
| Bundler / Dev server   | [Vite 5](https://vitejs.dev/) avec [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (compilation via SWC) |
| Routing                | [react-router-dom v6](https://reactrouter.com/)                    |
| Styles                 | [Tailwind CSS 3](https://tailwindcss.com/) + CSS modulaire par composant |
| Post-processing CSS    | [PostCSS](https://postcss.org/), [Autoprefixer](https://github.com/postcss/autoprefixer), [postcss-import-alias](https://www.npmjs.com/package/postcss-import-alias) |
| Icônes                 | [react-icons](https://react-icons.github.io/react-icons/) (packs `fa`, `fa6`, `gi`, `pi`, `ri`) |
| Qualité de code        | [ESLint](https://eslint.org/) (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |
| Résolution de chemins  | Alias `@` → `src/` (configuré dans `vite.config.js`, `jsconfig.json` et PostCSS) |
| Langage                | JavaScript (JSX), pas de TypeScript (types fournis en dev via `@types/react` / `@types/react-dom` pour l'auto-complétion) |

---

## 📁 Structure du projet

```
src/
├── assets/               # Images, audio, fichiers statiques
├── components/
│   ├── App/              # Composant racine et routing
│   ├── ErrorPage/        # Page d'erreur
│   ├── Game/             # Écran de jeu principal
│   ├── GameDatas/        # Données du jeu (Character, Items, Quests, Recipes)
│   ├── Menu/             # Barre latérale + gestion des fenêtres ouvertes
│   ├── Modal/
│   │   ├── Base/         # Fenêtre générique (draggable, fermable)
│   │   ├── Shop/         # Boutique
│   │   ├── Inventory/    # Inventaire
│   │   ├── Recipes/      # Recettes
│   │   ├── Profil/       # Profil / Quêtes / Aide
│   │   └── Creation/     # Création de personnage
│   ├── MusicPlayer/      # Lecteur audio
│   └── StartGame/        # Écran de démarrage
├── index.css
└── main.jsx              # Point d'entrée de l'application
```


## 📄 Licence

Copyright (c) 2026 Yirzaraji

Tous droits réservés.