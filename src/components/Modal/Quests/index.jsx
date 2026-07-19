import React, { Fragment, useState } from "react";
import { GiScrollUnfurled, GiPotionBall, GiStarsStack, GiTwoCoins } from "react-icons/gi";
import { GAME_QUESTS } from "@/components/GameDatas/Quests";
import "./Quests.css";

// Regroupe la liste plate de quêtes par chapitre, uniquement pour l'affichage
// en accordéon de la colonne de gauche (GAME_QUESTS lui-même reste une simple
// liste plate, on ne le transforme pas en place).
const groupByChapter = (quests) => {
  const chaptersMap = new Map();
  quests.forEach((quest) => {
    if (!chaptersMap.has(quest.chapter)) {
      chaptersMap.set(quest.chapter, {
        chapter: quest.chapter,
        chapterTitle: quest.chapterTitle,
        chapterSubtitle: quest.chapterSubtitle,
        quests: [],
      });
    }
    chaptersMap.get(quest.chapter).quests.push(quest);
  });
  return Array.from(chaptersMap.values()).sort((a, b) => a.chapter - b.chapter);
};

const chapters = groupByChapter(GAME_QUESTS);

const Quests = () => {
  // Accordéon des chapitres : un seul ouvert à la fois (premier ouvert par défaut)
  const [openChapterIndex, setOpenChapterIndex] = useState(0);

  // On ne stocke que l'id de la quête sélectionnée, on la retrouve dans
  // GAME_QUESTS au moment du rendu -> jamais de référence figée/périmée.
  const [selectedQuestId, setSelectedQuestId] = useState(chapters[0]?.quests[0]?.id ?? null);
  const selectedQuest = GAME_QUESTS.find((quest) => quest.id === selectedQuestId);

  const toggleChapter = (index) => {
    setOpenChapterIndex(openChapterIndex === index ? null : index);
  };

  const handleSelectQuest = (quest) => {
    setSelectedQuestId(quest.id);
  };

  return (
    <Fragment>
      <div className="quests-layout flex">
        {/* Colonne gauche : chapitres (accordéon) + quêtes de chaque chapitre */}
        <div className="quests-chapters-column overflow-y-auto max-h-[540px]">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapter} className="chapter-item text-white">
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
                  <h4 className="uppercase">{chapter.chapterTitle}</h4>
                  <p>{chapter.chapterSubtitle}</p>
                </div>
              </div>
              <div
                className={`chapter-content ${
                  openChapterIndex === chapterIndex ? "open" : "closed"
                }`}
              >
                {chapter.quests.map((quest) => (
                  <div
                    key={quest.id}
                    onClick={() => handleSelectQuest(quest)}
                    className={`quest-list-item cursor-pointer p-2 pl-5 ${
                      selectedQuestId === quest.id ? "active" : ""
                    }`}
                  >
                    {quest.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Colonne droite : détail de la quête sélectionnée */}
        <div className="quests-details-column p-5 text-white">
          {selectedQuest ? (
            <Fragment>
              <h4 className="quest-detail-title uppercase border-b border-gray-600 mb-3 pb-1">
                {selectedQuest.title}
              </h4>

              <div className="quest-detail-description text-justify mb-5">
                {selectedQuest.description}
              </div>

              {selectedQuest.objectives?.length > 0 && (
                <Fragment>
                  <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                    Objectif
                  </h6>
                  <div className="quest-detail-tags flex flex-wrap gap-2 mt-2 mb-4">
                    {selectedQuest.objectives.map((objective) => (
                      <span key={objective.itemId} className="quest-tag quest-tag-required">
                        {objective.name} x{objective.quantity}
                      </span>
                    ))}
                  </div>
                </Fragment>
              )}

              <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                Récompense
              </h6>
              <div className="quest-detail-rewards flex items-center gap-6 mt-3">
                <span className="inline-flex items-center gap-2 quest-gold">
                  <GiTwoCoins className="text-3xl" />
                  {selectedQuest.rewards.gold} or
                </span>
                <span className="inline-flex items-center gap-2 quest-xp">
                  <GiStarsStack className="text-3xl" />
                  +{selectedQuest.rewards.xp} XP
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