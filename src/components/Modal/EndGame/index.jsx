import React from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import "./EndGame.css";

/**
 * Fenetre centrale affichee quand le joueur a termine TOUTES les quetes du
 * jeu. Contrairement aux autres modales (Shop, Inventaire, Quete...) qui
 * s'ouvrent depuis le Menu, celle-ci est auto-declenchee par Game.jsx des
 * que completedQuestIds couvre l'integralite de GAME_QUESTS.
 *
 * - "Recommencer" : reinitialise uniquement la progression des quetes
 *   (Game.jsx s'occupe de la logique, ce composant ne fait qu'appeler la prop).
 * - Fermer (x) : masque juste la fenetre, aucune reinitialisation.
 */
const EndGame = ({ show, onClose, onRestart }) => {
  if (!show) return null;

  return (
    <div className="endgame-overlay endgame-overlay flex justify-center items-center">
      <div className="endgame-modal">
        <div className="endgame-modal-topbar" />

        <button
          className="modal-close-btn endgame-btn"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>

        <div className="endgame-modal-body">
          <GiLaurelsTrophy className="endgame-icon mt-4" />
          <h2 className="endgame-title">Félicitations !</h2>
          <p className="endgame-text">
            Vous avez terminé toutes les quêtes avec succès. Votre nom restera
            gravé parmi les plus grands alchimistes du royaume.
          </p>
          <p className="endgame-subtext">
            Vous pouvez recommencer l'aventure pour continuer à monter en
            niveau et accumuler encore plus d'or — votre progression actuelle
            est conservée.
          </p>

          <button className="endgame-restart-btn" onClick={onRestart}>
            Recommencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndGame;