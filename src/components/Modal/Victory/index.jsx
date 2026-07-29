import React from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import "./Victory.css";

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
const Victory = ({ show, onClose, onRestart }) => {
  if (!show) return null;

  return (
    <div className="victory-overlay">
      <div className="victory-modal">
        <div className="victory-modal-topbar" />

        <button
          className="modal-close-btn victory-close-btn"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>

        <div className="victory-modal-body">
          <GiLaurelsTrophy className="victory-icon" />
          <h2 className="victory-title self-end">Félicitations !</h2>
          <p className="victory-text">
            Vous avez terminé toutes les quêtes avec succès. Votre nom restera
            gravé parmi les plus grands alchimistes du royaume.
          </p>
          <p className="victory-subtext">
            Vous pouvez recommencer l'aventure pour continuer à monter en
            niveau et accumuler encore plus d'or — votre progression actuelle
            est conservée.
          </p>

          <button className="victory-restart-btn" onClick={onRestart}>
            Recommencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Victory;