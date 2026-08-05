import React, { Fragment } from "react";
import { GiLaurelCrown, GiPadlock, GiCheckMark } from "react-icons/gi";
import Tooltip from "@/components/Tooltip";
import CharacterData from "@/data/Character";
import { CHAPTERS } from "@/data/Quests";
import "./PlayerHud.css";

/**
 * Widget affiche portrait, niveau, classe et
 * progression a travers les chapitres.
 *
 * Composant presentationnel pur : pseudo/classe arrivent en props depuis
 * Game (source unique de verite), plus de lecture directe du localStorage.
 */
const PlayerHud = ({ playerLevel, xpPercent, currentChapterIndex, pseudo, classe }) => {
  const displayPseudo = pseudo || "Aventurier";
  const displayClasse = classe || "Inconnue";

  const level = playerLevel || 1;
  const classeData = CharacterData.find((entry) => entry.name === displayClasse);
  const avatarImage = classeData?.avatar || CharacterData[0].avatar;

  return (
    <div className="player-hud player-hud-tw">
      <div className="player-hud-main tw-player-hud-main">
        {/* Portrait, mis en avant : plus grand que le reste du widget */}
        <div className="player-hud-avatar-wrap tw-player-hud-avatar-wrap">
          <div className="player-hud-avatar tw-player-hud-avatar"
            style={{ backgroundImage: `url(${avatarImage})`,"--classe-accent": classeData?.color, }}
          ></div>
          <div className="player-hud-level-badge tw-player-hud-level-badge">
            <span>{level}</span>
          </div>
        </div>

        {/* Identite + barre d'XP, reprise de Profil */}
        <div className="player-hud-identity">
          <h5 className="player-hud-classe tw-player-hud-classe">{displayClasse}</h5>
          <h2 className="player-hud-pseudo tw-player-hud-pseudo">{displayPseudo}</h2>
          <div className="player-hud-xp-bar tw-player-hud-xp-bar">
            <div
              className="player-hud-xp-fill"
              style={{ width: `${xpPercent || 0}%` }}
            ></div>
          </div>
          <span className="player-hud-xp-label tw-player-hud-xp-label">Niveau {level}</span>
        </div>
      </div>

      {/* Roadmap des chapitres */}
      <div className="player-hud-roadmap">
        {CHAPTERS.map((chapter, index) => {
          const isCompleted = index < (currentChapterIndex || 0);
          const isCurrent = index === (currentChapterIndex || 0);
          const status = isCompleted ? "completed" : isCurrent ? "current" : "locked";
          return (
            <Fragment key={chapter.chapter}>
              <Tooltip content={<span>{chapter.chapterTitle}</span>}>
                <div className={`player-hud-step ${status}`}>
                  {isCompleted ? (
                    <GiCheckMark />
                  ) : isCurrent ? (
                    <GiLaurelCrown />
                  ) : (
                    <GiPadlock />
                  )}
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