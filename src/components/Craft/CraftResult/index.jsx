import { GiPotionBall, GiSkullCrossedBones } from "react-icons/gi";
import "./CraftResult.css";

const CraftResult = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className="craft-result-backdrop" onClick={onClose}>
      <div className="craft-result-card" onClick={(event) => event.stopPropagation()}>
        {result.success ? (
          <>
            <GiPotionBall className="craft-result-icon craft-result-icon-success" />
            <h4 className="craft-result-title">Felicitations !</h4>
            <p className="craft-result-text">
              Vous avez cree : <b>{result.potionName}</b>
            </p>
          </>
        ) : (
          <>
            <GiSkullCrossedBones className="craft-result-icon craft-result-icon-fail" />
            <h4 className="craft-result-title">Le melange n'a rien donne...</h4>
            <p className="craft-result-text">
              Cette combinaison d'ingredients ne correspond a aucune recette
              connue. Retentez votre chance !
            </p>
          </>
        )}
        <button type="button" className="craft-result-close-btn" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default CraftResult;