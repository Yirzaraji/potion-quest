import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startingBg from "@/assets/starting-screen.png";
import "./StarGame.css";

const FADE_OUT_DURATION_MS = 400;

const Home = () => {
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
      className={`home-container flex h-svh w-full items-end justify-center pb-8 ${
        isLeaving ? "fade-out" : ""
      }`}
      style={{ backgroundImage: `url(${startingBg})` }}
    >
      <button
        type="button"
        onClick={() => setIsLeaving(true)}
        disabled={isLeaving}
        className="start-play-btn"
      >
        Jouer
      </button>
    </main>
  );
};

export default Home;