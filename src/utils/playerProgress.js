/* Progression du joueur : tout se deduit d'un seul nombre stocke dans
Game.jsx (playerXp, un total cumule). Le niveau et le % de remplissage de
la barre d'XP sont des VUES sur ce nombre, jamais des states a part

XP necessaire pour passer un palier de niveau. Fixe pour l'instant ;
remplacer par une courbe progressive (ex: XP_PER_LEVEL * level) le jour
ou l'equilibrage du jeu le demandera, sans rien changer ailleurs. */
export const XP_PER_LEVEL = 500;

export const getLevelFromXp = (totalXp) => {
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
};

/* % de remplissage de la barre d'XP a l'interieur du niveau courant
(0-100), pour Profil/PlayerHud. */
export const getXpProgressPercent = (totalXp) => {
  const xpInCurrentLevel = totalXp % XP_PER_LEVEL;
  return Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100);
};