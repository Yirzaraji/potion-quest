import React, { useEffect, useRef, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.1; // volume par défaut à 50%

    // .play() renvoie une promesse ; on la capture pour pouvoir l'ignorer
    // proprement si l'effet est nettoyé avant qu'elle ne se résolve (ce que
    // fait React.StrictMode exprès en dev, en montant l'effet deux fois).
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Lecture bloquée ou interrompue (autoplay refusé, ou effet nettoyé
        // avant la fin de la promesse) : rien à faire, l'utilisateur pourra
        // toujours démarrer le son via le clic sur l'icône.
      });
    }

    return () => {
      // Ne PAS mettre audio.pause() ici : on veut que la musique continue en
      // fond, ce cleanup sert juste à ne rien casser lors du double montage
      // de StrictMode en dev.
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
      <audio ref={audioRef} src="/D&DThemeGuitarCover.mp3" loop autoPlay muted />
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