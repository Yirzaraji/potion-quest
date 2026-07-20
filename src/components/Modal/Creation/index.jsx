import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHatWizard } from "react-icons/fa6";
import { GiWizardStaff, GiOakLeaf, GiBatWing, GiQuillInk } from "react-icons/gi";
import GameDatas from "@/components/GameDatas/Character";
import "./Creation.css";

// Theme visuel (couleur d'accent + icone) propre a chaque classe. Cle sur le
// nom exact tel qu'ecrit dans GameDatas/Character. Fallback dore si jamais
// une classe n'a pas (encore) de theme associe.
const CLASS_THEME = {
  Mage: { color: "#4f8fe0", icon: GiWizardStaff },
  Druide: { color: "#5fae56", icon: GiOakLeaf },
  Sorcier: { color: "#a13ad1", icon: GiBatWing },
};
const DEFAULT_THEME = { color: "#ffd75e", icon: GiWizardStaff };

const Modal = () => {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");
  const [selectedClasse, setSelectedClasse] = useState(null); // index de la classe choisie
  const [isSubmit, setIsSubmit] = useState(false);

  const selectedClasseData =
    selectedClasse !== null ? GameDatas[selectedClasse] : null;
  const selectedTheme = selectedClasseData
    ? CLASS_THEME[selectedClasseData.name] || DEFAULT_THEME
    : null;

  const canSubmit = pseudo.trim().length > 0 && selectedClasseData !== null;

  const handleChange = (event) => {
    setPseudo(event.target.value);
  };

  // On passe directement l'index (plutot que de relire event.target.textContent) :
  // plus robuste, chaque carte contenant plusieurs elements imbriques (avatar,
  // badge d'icone, nom).
  const handleClickClasse = (index) => {
    setSelectedClasse(index);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && canSubmit) {
      const userDatas = {
        pseudo: pseudo.trim(),
        classe: selectedClasseData.name,
      };
      localStorage.setItem("userDatas", JSON.stringify(userDatas));
      console.log("Saved to localStorage:", userDatas);
      navigate("/game");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <Fragment>
      <div className={`creation-modal ${isSubmit ? "creation-hidden" : ""}`}>
        <div className="creation-topbar"></div>

        <div className="creation-header">
          <FaHatWizard className="creation-header-icon" />
          <h5 className="creation-title uppercase">Creation du personnage</h5>
          <p className="creation-subtitle">
            Choisissez votre nom et votre voie avant de rejoindre Potion Quest
          </p>
        </div>

        <div className="creation-body">
          <div className="creation-field mb-6">
            <label htmlFor="pseudo" className="creation-label uppercase">
              Pseudo
            </label>
            <div className="creation-input-wrapper">
              <FaUser className="creation-input-icon" />
              <input
                id="pseudo"
                type="text"
                value={pseudo}
                onChange={handleChange}
                placeholder="Entrez votre pseudo..."
                className="creation-input"
              />
            </div>
          </div>

          <div className="creation-field">
            <div className="creation-label uppercase mb-3">Classe</div>
            <div className="creation-classes flex justify-evenly">
              {GameDatas.map((classeData, index) => {
                const theme = CLASS_THEME[classeData.name] || DEFAULT_THEME;
                const ClasseIcon = theme.icon;
                const isSelected = selectedClasse === index;
                return (
                  <div
                    key={classeData.id}
                    onClick={() => handleClickClasse(index)}
                    style={{ "--classe-accent": theme.color }}
                    className={`creation-classe-card ${isSelected ? "selected" : ""}`}
                  >
                    <div className="creation-classe-avatar-wrapper">
                      <div className="creation-classe-avatar"></div>
                      <div className="creation-classe-icon-badge">
                        <ClasseIcon />
                      </div>
                    </div>
                    <span className="creation-classe-name uppercase">
                      {classeData.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="creation-description-card"
            style={{ "--classe-accent": selectedTheme?.color || "#ffd75e" }}
          >
            <GiQuillInk className="creation-description-icon" />
            <div className="creation-description text-justify">
              {selectedClasseData
                ? selectedClasseData.description
                : "Selectionnez une classe pour decouvrir ses aptitudes."}
            </div>
          </div>
        </div>

        <div className="creation-footer">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="creation-submit-btn uppercase"
          >
            Valider
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;