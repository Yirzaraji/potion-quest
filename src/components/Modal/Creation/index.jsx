import { useState, useEffect } from "react";
import { FaUser, FaHatWizard } from "react-icons/fa6";
import { GiQuillInk } from "react-icons/gi";
import GameDatas from "@/data/Character";
import logo from "@/assets/logo.png";
import "./Creation.css";

const STEPS = { WELCOME: "welcome", FORM: "form" };
const SUBMIT_TRANSITION_DURATION_MS = 500;

// Recupere la couleur d'une classe par son nom, directement depuis
// GameDatas/Character
const getClassColor = (name) =>
  GameDatas.find((classeData) => classeData.name === name)?.color ||
  "var(--yirsa-deep-yellow)";

const Creation = () => {
  const [step, setStep] = useState(STEPS.WELCOME);
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
    if (!isSubmit || !canSubmit) return;

    const userDatas = {
      pseudo: pseudo.trim(),
      classe: selectedClasseData.name,
    };
    localStorage.setItem("userDatas", JSON.stringify(userDatas));
    console.log("Saved to localStorage:", userDatas);

    // Laisse le temps a la transition CSS (fondu + flou, voir .creation-leaving)
    const timeout = setTimeout(
      () => setIsHidden(true),
      SUBMIT_TRANSITION_DURATION_MS
    );
    return () => clearTimeout(timeout);
  }, [isSubmit, canSubmit, pseudo, selectedClasseData]);

  return (
    <>
      {/* Bloque toute interaction avec le jeu tant que le personnage n'est pas cree */}
      <div
        className={`creation-backdrop fixed inset-0 z-[90000] ${
          isSubmit ? "creation-leaving" : ""
        } ${isHidden ? "creation-hidden" : ""}`}
      ></div>

      <div
        className={`creation-modal fixed left-1/2 top-1/2 z-[90001] flex w-[92vw] max-w-[550px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden ${
          isSubmit ? "creation-leaving" : ""
        } ${isHidden ? "creation-hidden" : ""}`}
      >
        <div className="creation-topbar h-[5px] w-full flex-shrink-0"></div>

        {step === STEPS.WELCOME ? (
          <div className="creation-welcome-wrapper flex flex-1 flex-col overflow-hidden px-7 pb-6 pt-5">
            <div className="creation-welcome-header mb-3 flex-shrink-0 text-center">
              <img
                src={logo}
                alt="Potion Quest"
                className="creation-welcome-logo mx-auto mb-2.5 block w-[125px]"
              />
              <h4 className="creation-welcome-title">
                Bienvenue sur les Terres de Logres
              </h4>
            </div>

            <div className="creation-welcome-scroll flex-1 overflow-y-auto">
              <blockquote className="creation-welcome-quote mb-4">
                « Camelot brille de mille feux, mais ses fondations reposent
                sur des os broyes et de la terre gelee. »
              </blockquote>

              <p className="creation-welcome-text mb-3.5 text-justify">
                Le souffle glace du Nord balaie le royaume. Le Roi Arthur a
                uni ces terres par le fer et la colere, mais la paix a un
                gout de cendre. Les legendes ne disent pas tout : les plaies
                de la guerre purulent encore, et sous les armures rutilantes
                de la Table Ronde dorment la peur, la folie et la trahison.
              </p>

              <p className="creation-welcome-text mb-3.5 text-justify">
                Pour acheter votre silence — ou exploiter votre pouvoir —, le
                Souverain vous a relegue un lopin de terre boueux et une
                batisse delabree a la lisiere des bois profonds.
              </p>

              <p className="creation-welcome-text mb-3.5 text-justify">
                Que vous soyez un{" "}
                <span
                  className="font-semibold"
                  style={{ color: getClassColor("Druide") }}
                >
                  Druide
                </span>{" "}
                gardien d'anciens rites sanglants, un{" "}
                <span
                  className="font-semibold"
                  style={{ color: getClassColor("Mage") }}
                >
                  Mage
                </span>{" "}
                consume par des arcanes interdites, ou un{" "}
                <span
                  className="font-semibold"
                  style={{ color: getClassColor("Sorcier") }}
                >
                  Sorcier des Ombres
                </span>{" "}
                lie aux esprits qui arpentent la nuit, ce taudis est
                desormais votre sanctuaire.
              </p>

              <div className="creation-welcome-divider my-1 mb-3.5 flex items-center justify-center">
                <span className="creation-welcome-divider-icon">✦</span>
              </div>

              <h5 className="creation-welcome-subtitle mb-1 text-center">
                🩸 Le Chatiment des Mortels
              </h5>

              <p className="creation-welcome-text mb-3.5 text-justify">
                Dans ce monde impitoyable, personne ne vient vous voir par
                plaisir. On franchit votre porte quand l'espoir a disparu.
              </p>

              <ul className="creation-welcome-list mb-3.5">
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

              <p className="creation-welcome-text mb-3.5 text-justify">
                Chaque philtre que vous preparez a un prix. Chaque goutte
                versee dans vos chaudrons peut sauver une vie... ou sceller
                la perte d'un empire.
              </p>

              <p className="creation-welcome-text creation-welcome-closing text-center font-semibold">
                Attisez la braise. Le froid s'installe, et vos visiteurs
                n'ont plus beaucoup de temps.
              </p>
            </div>

            <div className="creation-welcome-footer mt-2 flex-shrink-0 pt-2">
              <button
                type="button"
                onClick={() => setStep(STEPS.FORM)}
                className="creation-submit-btn w-full"
              >
                Commencer l'aventure
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="creation-header">
              <div className="logo-img flex items-center justify-center pb-2 pt-4">
                <img src={logo} alt="Potion Quest" className="creation-header-logo w-[125px]" />
              </div>
              <h5 className="creation-title mb-[-8px]">
                Creation du personnage
              </h5>
              <p className="creation-subtitle pb-2">
                Choisissez votre nom et votre voie avant de rejoindre Potion
                Quest
              </p>
            </div>

            <div className="creation-body flex flex-1 flex-col overflow-y-auto px-7 pt-1">
              <div className="creation-field mb-7">
                <label htmlFor="pseudo" className="creation-label">
                  Pseudo
                </label>
                <div className="creation-input-wrapper relative mt-2">
                  <FaUser className="creation-input-icon absolute left-3 top-1/2 -translate-y-1/2 text-sm" />
                  <input
                    id="pseudo"
                    type="text"
                    value={pseudo}
                    onChange={handleChange}
                    placeholder="Entrez votre pseudo..."
                    className="creation-input w-full "
                    spellCheck="false"
                  />
                </div>
              </div>

              <div className="creation-field">
                <div className="creation-label mb-1">Classe</div>
                <div className="creation-classes flex flex-wrap justify-center gap-3">
                  {GameDatas.map((classeData, index) => {
                    const ClasseIcon = classeData.icon;
                    const isSelected = selectedClasse === index;
                    return (
                      <div
                        key={classeData.id}
                        onClick={() => handleClickClasse(index)}
                        style={{ "--classe-accent": classeData.color }}
                        className={`creation-classe-card flex flex-col items-center gap-2.5 rounded-[10px] p-1.5 ${
                          isSelected ? "selected" : ""
                        }`}
                      >
                        <div className="creation-classe-avatar-wrapper relative">
                          <div
                            className="creation-classe-avatar h-[78px] w-[78px] rounded-full"
                            style={{
                              backgroundImage: `url(${classeData.avatar})`,
                            }}
                          ></div>
                          <div className="creation-classe-icon-badge absolute -bottom-1 -right-1 flex h-[26px] w-[26px] items-center justify-center rounded-full">
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
                className="creation-description-card relative flex-1"
                style={{
                  "--classe-accent":
                    selectedClasseData?.color || "var(--yirsa-deep-yellow)",
                }}
              >
                <GiQuillInk className="creation-description-icon absolute right-4 top-3.5" />
                <div className="creation-description pr-6 text-justify">
                  {selectedClasseData
                    ? selectedClasseData.description
                    : "Selectionnez une classe pour decouvrir ses aptitudes."}
                </div>
              </div>
            </div>

            <div className="creation-footer flex-shrink-0 px-7 pb-6 pt-5 text-center">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="creation-submit-btn w-full"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Creation;