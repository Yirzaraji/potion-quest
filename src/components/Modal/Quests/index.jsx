import React, { Fragment, useState } from "react";
import { GiScrollUnfurled, GiPotionBall, GiStarsStack } from "react-icons/gi";
import QuestsObject from "@/components/GameDatas/Quests";
import "./Quests.css";

// XP fixe par quête pour l'instant (300, comme convenu). À terme, ce serait
// bien d'ajouter un champ `xpReward` directement sur chaque quête dans
// GameDatas/Quests pour pouvoir varier ce montant par quête si besoin.
const XP_PER_QUEST = 300;

// Donnée statique du jeu : un seul appel au chargement du module (pas besoin
// de la recalculer à chaque rendu, ce n'est pas de la donnée dynamique).
const gameData = QuestsObject()[0];
const chapters = gameData?.chapters ?? [];

const Quests = () => {
  // Accordéon des chapitres : un seul ouvert à la fois (premier ouvert par défaut)
  const [openChapterIndex, setOpenChapterIndex] = useState(0);

  // On ne stocke que les identifiants de la quête sélectionnée (pas l'objet
  // entier) et on le retrouve dans `chapters` au moment du rendu -> toujours
  // synchronisé avec la donnée source, jamais de référence figée/périmée.
  const firstActiveQuest = chapters[0]?.quests.find((q) => q.isActive);
  const [selected, setSelected] = useState(
    firstActiveQuest
      ? { chapterId: chapters[0].id, questId: firstActiveQuest.id }
      : null
  );

  const selectedChapter = chapters.find((c) => c.id === selected?.chapterId);
  const selectedQuest = selectedChapter?.quests.find((q) => q.id === selected?.questId);

  const toggleChapter = (index) => {
    setOpenChapterIndex(openChapterIndex === index ? null : index);
  };

  const handleSelectQuest = (chapter, quest) => {
    setSelected({ chapterId: chapter.id, questId: quest.id });
  };

  return (
    <Fragment>
      <div className="quests-layout flex">
        <div className="quests-chapters-column overflow-y-auto max-h-[540px]">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id} className="chapter-item text-white">
              <div
                className={`chapter-title flex cursor-pointer p-2 hover:bg-purple-900 duration-500 ${
                  openChapterIndex === chapterIndex ? "bg-purple-900" : ""
                }`}
                onClick={() => toggleChapter(chapterIndex)}
              >
                <div className="chapter-description-icon flex items-center">
                  <GiScrollUnfurled className="text-4xl" />
                </div>
                <div className="chapter-description-container ml-3">
                  <h4 className="uppercase">{chapter.title}</h4>
                  <p>{chapter.description}</p>
                </div>
              </div>
              <div
                className={`chapter-content ${
                  openChapterIndex === chapterIndex ? "open" : "closed"
                }`}
              >
                {chapter.quests.map((quest) => {
                  const isSelected =
                    selected?.chapterId === chapter.id && selected?.questId === quest.id;
                  return (
                    <div
                      key={`chapitre${chapter.id}.quete${quest.id}`}
                      onClick={() => handleSelectQuest(chapter, quest)}
                      className={`quest-list-item cursor-pointer flex items-center justify-between p-2 pl-5 ${
                        isSelected ? "active" : ""
                      }`}
                    >
                      <span>{quest.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="quests-details-column p-5 text-white">
          {selectedQuest ? (
            <Fragment>
                <div className="chapter-description-icon flex border-b border-gray-600 mb-3">
                  <GiScrollUnfurled className="text-3xl" />
                    <h4 className="quest-detail-title uppercase pl-2 mb-3">
                        {selectedQuest.title}
                    </h4>
                </div>
              <div className="quest-detail-description text-justify mb-5">
                {selectedQuest.description}
              </div>

              {selectedQuest.requiredItems?.length > 0 && (
                <Fragment>
                  <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                    Objectif
                  </h6>
                  <div className="quest-detail-tags flex flex-wrap gap-2 mt-2 mb-4">
                    {selectedQuest.requiredItems.map((itemName) => (
                      <span key={itemName} className="quest-tag quest-tag-required">
                        {itemName}
                      <GiPotionBall className="text-5xl" /></span>
                    ))}
                  </div>
                </Fragment>
              )}

              {selectedQuest.providedItems?.length > 0 && (
                <Fragment>
                  <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                    Recompense
                  </h6>
                  <div className="quest-detail-tags flex flex-wrap gap-2 mt-2 mb-4">
                    {selectedQuest.providedItems.map((itemName) => (
                      <span key={itemName} className="quest-tag quest-tag-provided">
                        {itemName}
                      <GiPotionBall className="text-5xl" /></span>
                    ))}
                  </div>
                </Fragment>
              )}

              <div className="quest-detail-rewards flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-2 quest-xp">
                    <GiStarsStack className="text-3xl" />
                    +{XP_PER_QUEST} XP
                </span>
                </div>

                <div className="quest-start-btn w-full flex items-center justify-center h-12 cursor-pointer uppercase font-bold mt-4">
                  Accepter
                </div>
            </Fragment>
          ) : (
            <p className="text-center mt-10">
              Sélectionnez une quête pour voir son détail.
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Quests;