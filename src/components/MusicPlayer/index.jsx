import React, { useEffect, useRef, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // volume par défaut à 50%

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    return () => {};
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Les navigateurs bloquent le son tant qu'il n'y a pas eu d'interaction
    // de l'utilisateur sur la page. On écoute donc sa toute première
    // interaction (clic, tap, touche clavier) n'importe où sur /game pour
    // activer le son automatiquement à ce moment-là, sans qu'il ait besoin
    // de cliquer précisément sur l'icône.
    const unmuteOnFirstInteraction = () => {
      audio.muted = false;
      setIsMuted(false);
    };

    window.addEventListener("pointerdown", unmuteOnFirstInteraction, { once: true });
    window.addEventListener("keydown", unmuteOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unmuteOnFirstInteraction);
      window.removeEventListener("keydown", unmuteOnFirstInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <audio ref={audioRef} src="/D&DThemeGuitarCover.mp3" autoPlay />
      <button
        type="button"
        onClick={toggleMute}
        className="music-player-toggle"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
        title={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </button>
    </>
  );
};

export default MusicPlayer;