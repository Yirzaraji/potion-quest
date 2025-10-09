// src/components/MusicPlayer.js
import React, { useRef, useState } from "react";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.4); // Volume initial à 40%

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      <audio ref={audioRef} src="/D&DThemeGuitarCover.mp3" autoPlay loop />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <div style={{ position: "absolute", top: "40px", left: "0" }}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
