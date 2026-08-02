import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"],
      manifest: {
        name: "Potion Quest",
        short_name: "PotionQuest",
        description: "Jeu de craft de potion magique",
        theme_color: "#121212", 
        background_color: "#121212", // 👈 Cette couleur remplira le fond transparent de ton icône !
        display: "standalone",
        orientation: "any",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any", // 👈 Pour autoriser la transparence
          },
          {
            src: "pwa-maskable-192x192.png", // Ou ton image maskable dédiée avec fond plein
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable", // 👈 Indique à Android de découper l'image selon le thème
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any", // 👈 IMPORTANT : C'est cette icône qui sert pour le splash screen Android.
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});