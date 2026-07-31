import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startingBg from "@/assets/starting-screen.png";
import "./StartGame.css";

const FADE_OUT_DURATION_MS = 400;

const StartGame = () => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isLeaving) return;

    const timer = setTimeout(() => {
      navigate("/game");
    }, FADE_OUT_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isLeaving, navigate]);

  return (
    <main
      className={`start-game flex h-svh w-full items-end justify-center bg-cover bg-center px-4 pb-6 sm:pb-8 ${
        isLeaving ? "start-game--leaving" : ""
      }`}
      style={{ backgroundImage: `url(${startingBg})` }}
    >
      <button
        type="button"
        onClick={() => setIsLeaving(true)}
        disabled={isLeaving}
        className="start-game__btn px-10 py-3 font-oswald text-lg font-bold uppercase tracking-wider sm:px-14 sm:py-4 sm:text-2xl"
      >
        Jouer
      </button>
    </main>
  );
};

export default StartGame;