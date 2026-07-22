import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./StarGame.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="backgroundImage flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate("/game")}
          className="start-play-btn uppercase"
        >
          Jouer
        </button>
      </div>
    </Fragment>
  );
};

export default Home;