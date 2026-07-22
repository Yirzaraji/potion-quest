// Gestionnaire de bruitages d'interface (Web Audio API native).
// Independant du volume/mute de la musique d'ambiance (voir MusicPlayer).
//
// Principe : chaque son est precharge UNE SEULE FOIS au demarrage sous forme
// d'AudioBuffer decode en memoire. A chaque declenchement, on cree juste un
// AudioBufferSourceNode (objet tres leger, jetable) a partir de ce buffer
// partage -> latence minimale, plusieurs sons peuvent se chevaucher sans se
// couper les uns les autres, et rien n'est jamais redecode a la volee.

// Registre des sons : nom logique -> chemin du fichier dans /public/sfx.
const SOUND_FILES = {
  click: "/sfx/click.mp3",
  hover: "/sfx/hover.mp3",
  "modal-close": "/sfx/modal-close.mp3",
  "open-Shop": "/sfx/open-shop.mp3",
  "open-Inventaire": "/sfx/open-inventaire.mp3",
  "open-Recettes": "/sfx/open-recettes.mp3",
  "open-Quete": "/sfx/open-quete.mp3",
  "open-Profil": "/sfx/open-profil.mp3",
  "open-Aide": "/sfx/open-aide.mp3",
  drag: "/sfx/drag.mp3",
  drop: "/sfx/drop.mp3",
};

let audioContext = null;
const buffers = new Map(); // nom -> AudioBuffer decode
let isUnlocked = false;

const getContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Precharge tous les sons declares dans SOUND_FILES. Les erreurs (fichier pas
// encore ajoute, 404...) sont avalees silencieusement -> un son manquant ne
// doit jamais faire planter l'application.
export const preloadSfx = async () => {
  const ctx = getContext();
  await Promise.all(
    Object.entries(SOUND_FILES).map(async ([name, url]) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        buffers.set(name, audioBuffer);
      } catch (error) {
        console.warn(`Son "${name}" introuvable ou illisible (${url})`, error);
      }
    })
  );
};

// Debloque l'AudioContext apres la premiere interaction utilisateur (regle
// des navigateurs : aucun son ne peut jouer avant un geste explicite).
export const unlockSfx = () => {
  if (isUnlocked) return;
  const ctx = getContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  isUnlocked = true;
};

// Joue un son deja precharge. Ne fait rien si le nom est inconnu ou si le
// fichier n'a pas pu etre charge -> jamais bloquant pour le reste de l'app.
export const playSfx = (name) => {
  const buffer = buffers.get(name);
  if (!buffer) return;

  const ctx = getContext();
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
};