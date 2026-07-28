import React, { Fragment } from "react";
import { GiLaurelCrown, GiPadlock } from "react-icons/gi";
import Tooltip from "@/components/Tooltip";
import CharacterData from "@/data/Character";
import { GAME_QUESTS } from "@/data/Quests";
import "./PlayerHud.css";

// Meme derivation que Modal/Profil : les chapitres viennent directement des
// quetes plutot que d'une liste figee a part, pour rester coherent partout.
const CHAPTERS = [...new Map(
  GAME_QUESTS.map((quest) => [
    quest.chapter,
    { id: quest.chapter, title: quest.chapterTitle },
  ])
).values()].toSorted((a, b) => a.id - b.id);

/**
 * Widget affiche en haut/centre de l'ecran : portrait, niveau, classe et
 * progression a travers les chapitres. Reprend telles quelles les briques
 * visuelles de la modale Profil (avatar, barre d'XP, roadmap a cadenas) mais
 * dans un format condense, pensable comme un "resume" du Profil.
 *
 * ⚠️ Composant presentationnel : la lecture du pseudo/de la classe dans le
 * localStorage suit exactement le meme motif deja utilise dans Modal/Profil
 * (lecture defensive, aucune ecriture, aucun state). Le niveau et le
 * pourcentage d'XP restent des valeurs par defaut/decoratives en attendant
 * un vrai systeme de progression, comme c'est deja le cas dans Profil.
 */
const PlayerHud = ({ playerLevel }) => {
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
  // Barre d'XP purement decorative pour l'instant (comme dans Profil)
  const xpPercent = 35;

  return (
    <div className="player-hud">
      <div className="player-hud-main">
        {/* Portrait, mis en avant : plus grand que le reste du widget */}
        <div className="player-hud-avatar-wrap">
          <div
            className="player-hud-avatar img-avatar"
            style={{ backgroundImage: `url(${avatarImage})` }}
          ></div>
          <div className="player-hud-level-badge">
            <span>{level}</span>
          </div>
        </div>

        {/* Identite + barre d'XP, reprise de Profil */}
        <div className="player-hud-identity">
          <h5 className="player-hud-classe uppercase">{classe}</h5>
          <h2 className="player-hud-pseudo">{pseudo}</h2>
          <div className="player-hud-xp-bar">
            <div
              className="player-hud-xp-fill"
              style={{ width: `${xpPercent}%` }}
            ></div>
          </div>
          <span className="player-hud-xp-label">Niveau {level}</span>
        </div>
      </div>

      {/* Roadmap des chapitres, reprise de Profil : couronne pour le
          chapitre en cours, cadenas pour les chapitres verrouilles */}
      <div className="player-hud-roadmap">
        {CHAPTERS.map((chapter, index) => {
          const isCurrent = index === 0;
          return (
            <Fragment key={chapter.id}>
              <Tooltip content={<span>{chapter.title}</span>}>
                <div
                  className={`player-hud-step ${isCurrent ? "current" : "locked"}`}
                >
                  {isCurrent ? <GiLaurelCrown /> : <GiPadlock />}
                </div>
              </Tooltip>
              {index < CHAPTERS.length - 1 && (
                <div className="player-hud-connector"></div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerHud;