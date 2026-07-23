import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StarGame.css";

// Duree du fondu de sortie (ms), doit correspondre a la transition CSS
// definie sur .backgroundImage dans StarGame.css.
const FADE_OUT_DURATION_MS = 400;

const Home = () => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);

  const handlePlay = () => {
    setIsLeaving(true);
    // On laisse le fondu se jouer avant de changer de route, plutot que de
    // naviguer instantanement -> evite le "cut" brutal entre les deux ecrans.
    setTimeout(() => navigate("/game"), FADE_OUT_DURATION_MS);
  };

  return (
    <Fragment>
      <div
        className={`backgroundImage flex items-end justify-center pb-8 ${
          isLeaving ? "fade-out" : ""
        }`}
      >
        <button
          type="button"
          onClick={handlePlay}
          disabled={isLeaving}
          className="start-play-btn uppercase"
        >
          Jouer
        </button>
      </div>
    </Fragment>
  );
};

export default Home;