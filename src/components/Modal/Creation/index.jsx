import React, { Fragment, useState, useEffect } from "react";
import { FaUser, FaHatWizard } from "react-icons/fa6";
import { GiQuillInk } from "react-icons/gi";
import GameDatas from "@/data/Character";
import logo from "@/assets/logo.png";
import "./Creation.css";

// Recupere la couleur d'une classe par son nom, directement depuis
// GameDatas/Character
const getClassColor = (name) =>
  GameDatas.find((classeData) => classeData.name === name)?.color || "#ffd75e";

const Modal = () => {
  // "welcome" = message d'accueil / lore, "form" = formulaire pseudo + classe
  const [step, setStep] = useState("welcome");
  const [pseudo, setPseudo] = useState("");
  const [selectedClasse, setSelectedClasse] = useState(null); // index de la classe choisie
  const [isSubmit, setIsSubmit] = useState(false);

  // Passe a true UNIQUEMENT une fois la transition de fondu+flou terminee 
  const [isHidden, setIsHidden] = useState(false);

  const selectedClasseData =
    selectedClasse !== null ? GameDatas[selectedClasse] : null;

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

      // Laisse le temps a la transition CSS (fondu + flou, voir .creation-leaving
      const timeout = setTimeout(() => setIsHidden(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [isSubmit]);
  return (
    <Fragment>
      {/* Bloque toute interaction avec le jeu tant que le personnage n'est pas cree */}
      <div
        className={`creation-backdrop ${isSubmit ? "creation-leaving" : ""} ${
          isHidden ? "creation-hidden" : ""
        }`}
      ></div>

      <div
        className={`creation-modal ${isSubmit ? "creation-leaving" : ""} ${
          isHidden ? "creation-hidden" : ""
        }`}
      >
        <div className="creation-topbar"></div>

        {step === "welcome" ? (
          <div className="creation-welcome-wrapper">
            <div className="creation-welcome-header">
              <img src={logo} alt="Potion Quest" className="creation-welcome-logo" />
              <h4 className="creation-welcome-title">
                Bienvenue sur les Terres de Logres
              </h4>
            </div>

            <div className="creation-welcome-scroll overflow-y-auto">
              <blockquote className="creation-welcome-quote">
                « Camelot brille de mille feux, mais ses fondations reposent
                sur des os broyes et de la terre gelee. »
              </blockquote>

              <p className="creation-welcome-text creation-welcome-dropcap">
                Le souffle glace du Nord balaie le royaume. Le Roi Arthur a
                uni ces terres par le fer et la colere, mais la paix a un
                gout de cendre. Les legendes ne disent pas tout : les plaies
                de la guerre purulent encore, et sous les armures rutilantes
                de la Table Ronde dorment la peur, la folie et la trahison.
              </p>

              <p className="creation-welcome-text">
                Pour acheter votre silence — ou exploiter votre pouvoir —, le
                Souverain vous a relegue un lopin de terre boueux et une
                batisse delabree a la lisiere des bois profonds.
              </p>

              <p className="creation-welcome-text">
                Que vous soyez un{" "}
                <span style={{ color: getClassColor("Druide"), fontWeight: 600 }}>
                  Druide
                </span>{" "}
                gardien d'anciens rites sanglants, un{" "}
                <span style={{ color: getClassColor("Mage"), fontWeight: 600 }}>
                  Mage
                </span>{" "}
                consume par des arcanes interdites, ou un{" "}
                <span style={{ color: getClassColor("Sorcier"), fontWeight: 600 }}>
                  Sorcier des Ombres
                </span>{" "}
                lie aux esprits qui arpentent la nuit, ce taudis est
                desormais votre sanctuaire.
              </p>

              <div className="creation-welcome-divider">
                <span className="creation-welcome-divider-icon">✦</span>
              </div>

              <h5 className="creation-welcome-subtitle">
                🩸 Le Chatiment des Mortels
              </h5>

              <p className="creation-welcome-text">
                Dans ce monde impitoyable, personne ne vient vous voir par
                plaisir. On franchit votre porte quand l'espoir a disparu.
              </p>

              <ul className="creation-welcome-list">
                <li>
                  La populace affamee et miserable viendra vous supplier pour
                  un poison discret, un remede contre la pourriture des
                  chairs ou un baume pour oublier la rigueur de l'hiver.
                </li>
                <li>
                  Les seigneurs, les chevaliers brises et la Cour d'Arthur
                  s'abaisseront a solliciter vos elixirs pour survivre a la
                  prochaine bataille, cacher leurs peches ou abattre un rival
                  sans verser de sang.
                </li>
              </ul>

              <p className="creation-welcome-text">
                Chaque philtre que vous preparez a un prix. Chaque goutte
                versee dans vos chaudrons peut sauver une vie... ou sceller
                la perte d'un empire.
              </p>

              <p className="creation-welcome-text creation-welcome-closing">
                Attisez la braise. Le froid s'installe, et vos visiteurs
                n'ont plus beaucoup de temps.
              </p>
            </div>

            <div className="creation-welcome-footer">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="creation-submit-btn"
              >
                Commencer l'aventure
              </button>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="creation-header">
              <div className="logo-img pt-4 pb-2 flex justify-center items-center">
                <img src={logo} alt="Potion Quest" className="w-40"/>
              </div>
              <h5 className="creation-title">Creation du personnage</h5>
              <p className="creation-subtitle pb-2">
                Choisissez votre nom et votre voie avant de rejoindre Potion Quest
              </p>
            </div>

            <div className="creation-body">
              <div className="creation-field mb-6">
                <label htmlFor="pseudo" className="creation-label">
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
                <div className="creation-label mb-1">Classe</div>
                <div className="creation-classes flex justify-evenly">
                  {GameDatas.map((classeData, index) => {
                    const ClasseIcon = classeData.icon;
                    const isSelected = selectedClasse === index;
                    return (
                      <div
                        key={classeData.id}
                        onClick={() => handleClickClasse(index)}
                        style={{ "--classe-accent": classeData.color }}
                        className={`creation-classe-card ${isSelected ? "selected" : ""}`}
                      >
                        <div className="creation-classe-avatar-wrapper">
                          <div
                            className="creation-classe-avatar"
                            style={{ backgroundImage: `url(${classeData.avatar})` }}
                          ></div>
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
                style={{ "--classe-accent": selectedClasseData?.color || "#ffd75e" }}
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
                className="creation-submit-btn"
              >
                Valider
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Modal;