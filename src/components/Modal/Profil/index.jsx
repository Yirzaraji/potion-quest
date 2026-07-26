import React, { Fragment } from "react";
import { GiLaurelCrown, GiPadlock } from "react-icons/gi";
import Tooltip from "@/components/Tooltip";
import CharacterData from "@/data/Character";
import { GAME_QUESTS } from "@/data/Quests";
import "./Profil.css";

// Derive la liste des chapitres directement des quetes (memes donnees que
// Modal/Quests) plutot que d'avoir une liste de chapitres figee a part
const CHAPTERS = [...new Map(
  GAME_QUESTS.map((quest) => [
    quest.chapter,
    { id: quest.chapter, title: quest.chapterTitle },
  ])
).values()].toSorted((a, b) => a.id - b.id);
console.log(GAME_QUESTS)
console.log(CHAPTERS)

const Profil = ({ playerLevel }) => {
  // Lecture defensive : on evite un plantage si le joueur arrive ici sans
  // avoir encore de donnees enregistrees dans le localStorage.
  let pseudo = "Aventurier";
  let classe = "Inconnue";
  try {
    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    pseudo = userDatas?.pseudo || pseudo;
    classe = userDatas?.classe || classe;
  } catch {
    // valeurs par defaut deja en place
  }

  const level = playerLevel || 1;
  const classeData = CharacterData.find((entry) => entry.name === classe);
  const avatarImage = classeData?.avatar || CharacterData[0].avatar;
  // Barre d'XP purement decorative pour l'instant
  const xpPercent = 35;

  return (
    <Fragment>
      <div className="profil-container overflow-y-auto max-h-[540px] text-white">
        <div className="profil-header flex items-center">
          <div className="profil-avatar-wrapper">
            <div
              className="profil-avatar img-avatar"
              style={{ backgroundImage: `url(${avatarImage})` }}
            ></div>
            <div className="profil-level-badge">
              <span className="profil-level-number">{level}</span>
            </div>
          </div>
          <div className="profil-identity">
            <h5 className="profil-classe uppercase">{classe}</h5>
            <h2 className="profil-pseudo">{pseudo}</h2>
            <div className="profil-xp-bar">
              <div
                className="profil-xp-fill"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
            <span className="profil-xp-label">Niveau {level}</span>
          </div>
        </div>

        <section className="profil-section">
          <h4 className="profil-section-title uppercase border-b border-gray-600 mb-2 w-full">
            Biographie
          </h4>
          <div className="profil-bio text-justify">
            Magicien hors pair, <b>{pseudo}</b> connut la renommee durant ses
            etudes a la prestigieuse Academie de Magie de Dalaran. Son talent
            exceptionnel pour les arcanes fut decouvert tres tot, attirant
            l'attention des plus grands Archimages de la cite.
          </div>
        </section>

        <section className="profil-section">
          <h4 className="profil-section-title uppercase border-b border-gray-600 mb-2 w-full">
            Progression
          </h4>
          <div className="profil-roadmap flex items-center mt-6 mb-4">
            {CHAPTERS.map((chapter, index) => {
              const isCurrent = index === 0;
              return (
                <Fragment key={chapter.id}>
                  <Tooltip content={<span>{chapter.title}</span>}>
                    <div
                      className={`profil-roadmap-step ${
                        isCurrent ? "current" : "locked"
                      }`}
                    >
                      {isCurrent ? <GiLaurelCrown /> : <GiPadlock />}
                    </div>
                  </Tooltip>
                  {index < CHAPTERS.length - 1 && (
                    <div className="profil-roadmap-connector"></div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Profil;