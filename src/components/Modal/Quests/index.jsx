import React, { Fragment, useState } from "react";
import { 
  GiScrollUnfurled, 
  GiStarsStack, 
  GiTwoCoins, 
  GiHourglass,
  GiCheckMark,
  GiBoxUnpacking,
  GiPadlock
} from "react-icons/gi";
import { GAME_QUESTS } from "@/components/GameDatas/Quests";
import "./Quests.css";

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
  const [openChapterIndex, setOpenChapterIndex] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState(chapters[0]?.quests[0]?.id ?? null);
  
  // Quetes acceptees / en cours
  const [activeQuestIds, setActiveQuestIds] = useState([]);

  // Quetes accomplies/terminees
  const [completedQuestIds, setCompletedQuestIds] = useState([]);

  // Avancement des objets deposes
  const [questProgress, setQuestProgress] = useState({});

  // Feedback visuel du drag
  const [dragOverItemId, setDragOverItemId] = useState(null);

  // --- REGLE DE DEVERROUILLAGE DES CHAPITRES ---
  // Le chapitre N est debloque si c'est le chapitre 1, OU si TOUTES les quetes du chapitre N-1 sont terminees.
  const isChapterUnlocked = (chapterNum) => {
    if (chapterNum === 1) return true;
    
    const previousChapter = chapters.find((c) => c.chapter === chapterNum - 1);
    if (!previousChapter) return false;

    // Verifie si chaque quete du chapitre precedent est dans completedQuestIds
    return previousChapter.quests.every((q) => completedQuestIds.includes(q.id));
  };

  const selectedQuest = GAME_QUESTS.find((quest) => quest.id === selectedQuestId);

  const isSelectedActive = activeQuestIds.includes(selectedQuestId);
  const isSelectedCompleted = completedQuestIds.includes(selectedQuestId);

  // Verifie si la quete selectionnee est dans un chapitre verrouille
  const isSelectedQuestLocked = selectedQuest ? !isChapterUnlocked(selectedQuest.chapter) : true;

  // Verifie si tous les objets d'une quete ont ete deposes
  const checkIfQuestIsReadyToComplete = (quest) => {
    if (!quest || !quest.objectives || quest.objectives.length === 0) return true;
    const progress = questProgress[quest.id] || {};
    return quest.objectives.every((obj) => (progress[obj.itemId] || 0) >= obj.quantity);
  };

  const isSelectedReadyToComplete = isSelectedActive && checkIfQuestIsReadyToComplete(selectedQuest);

  const toggleChapter = (index, isUnlocked) => {
    if (!isUnlocked) return; // Empeche d'ouvrir les chapitres verrouilles
    setOpenChapterIndex(openChapterIndex === index ? null : index);
  };

  const handleSelectQuest = (quest, isUnlocked) => {
    if (!isUnlocked) return; // Empeche de selectionner une quete verrouillee
    setSelectedQuestId(quest.id);
  };

  const handleAcceptQuest = () => {
    if (!isSelectedActive && !isSelectedCompleted && !isSelectedQuestLocked) {
      setActiveQuestIds((prev) => [...prev, selectedQuestId]);
    }
  };

  const handleFinishQuest = () => {
    setActiveQuestIds((prev) => prev.filter((id) => id !== selectedQuestId));
    setCompletedQuestIds((prev) => [...prev, selectedQuestId]);
  };

  // --- Drag & Drop ---
  const handleDragOver = (e, itemId) => {
    e.preventDefault();
    setDragOverItemId(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  const handleDrop = (e, objective) => {
    e.preventDefault();
    setDragOverItemId(null);

    const itemData = e.dataTransfer.getData("application/json");
    if (itemData) {
      try {
        const item = JSON.parse(itemData);
        if (item.id === objective.itemId) {
          setQuestProgress((prev) => {
            const currentQuestData = prev[selectedQuestId] || {};
            const currentAmount = currentQuestData[objective.itemId] || 0;
            const newAmount = Math.min(currentAmount + (item.quantity || 1), objective.quantity);

            return {
              ...prev,
              [selectedQuestId]: {
                ...currentQuestData,
                [objective.itemId]: newAmount,
              },
            };
          });
        }
      } catch (err) {
        console.error("Erreur lors du drop de l item", err);
      }
    }
  };

  return (
    <div className="quests-layout flex rounded-lg overflow-hidden border border-purple-900/40 shadow-2xl bg-[#0e1114]">
      {/* Colonne gauche : Liste des quetes et chapitres */}
      <div className="quests-chapters-column overflow-y-auto max-h-[580px] w-1/2 border-r border-gray-800/80">
        {chapters.map((chapter, chapterIndex) => {
          const unlocked = isChapterUnlocked(chapter.chapter);
          const isOpen = openChapterIndex === chapterIndex && unlocked;

          return (
            <div
              key={chapter.chapter}
              className={`chapter-item text-white border-b border-gray-800/40 ${
                !unlocked ? "chapter-locked" : ""
              }`}
            >
              {/* En-tete du Chapitre */}
              <div
                className={`chapter-title flex items-center justify-between p-3 transition-colors duration-200 ${
                  !unlocked
                    ? "cursor-not-allowed opacity-50 bg-[#080b0e]"
                    : isOpen
                    ? "bg-[#251538] active-chapter cursor-pointer"
                    : "hover:bg-[#1a1325] cursor-pointer"
                }`}
                onClick={() => toggleChapter(chapterIndex, unlocked)}
              >
                <div className="flex items-center">
                  <div className={`chapter-description-icon flex items-center ${unlocked ? "text-purple-400" : "text-gray-600"}`}>
                    {unlocked ? <GiScrollUnfurled className="text-3xl" /> : <GiPadlock className="text-2xl text-gray-500" />}
                  </div>
                  <div className="chapter-description-container ml-3">
                    <h4 className={`uppercase font-bold text-sm tracking-wide ${unlocked ? "" : "text-gray-500"}`}>
                      {chapter.chapterTitle}
                    </h4>
                    <p className="text-xs text-gray-500">{chapter.chapterSubtitle}</p>
                  </div>
                </div>
              </div>

              {/* Quetes du Chapitre */}
              <div className={`chapter-content ${isOpen ? "open" : "closed"}`}>
                {chapter.quests.map((quest) => {
                  const isActive = activeQuestIds.includes(quest.id);
                  const isCompleted = completedQuestIds.includes(quest.id);
                  const isSelected = selectedQuestId === quest.id;

                  return (
                    <div
                      key={quest.id}
                      onClick={() => handleSelectQuest(quest, unlocked)}
                      className={`quest-list-item flex items-center justify-between py-2.5 px-4 pl-6 text-sm transition-all ${
                        !unlocked
                          ? "locked cursor-not-allowed opacity-40"
                          : "cursor-pointer"
                      } ${isSelected ? "active" : ""}`}
                    >
                      <span className="truncate">{quest.title}</span>
                      {isCompleted && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <GiCheckMark /> Terminee
                        </span>
                      )}
                      {isActive && !isCompleted && (
                        <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <GiHourglass className="animate-spin-slow" /> En cours
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Colonne droite : Detail de la quete */}
      <div className="quests-details-column p-6 text-white w-1/2 flex flex-col justify-between overflow-y-auto max-h-[580px]">
        {selectedQuest ? (
          <div className="flex flex-col h-full justify-between">
            <div>
              {/* Titre & Badge */}
              <div className="flex items-center justify-between border-b border-purple-900/50 pb-2 mb-4">
                <h3 className="quest-detail-title uppercase text-lg tracking-wider font-bold">
                  {selectedQuest.title}
                </h3>
                {isSelectedQuestLocked && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-700/40 px-2.5 py-1 rounded flex items-center gap-1">
                    <GiPadlock /> Chapitre Verrouille
                  </span>
                )}
                {!isSelectedQuestLocked && isSelectedCompleted && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-600/40 px-2.5 py-1 rounded">
                    Terminee
                  </span>
                )}
                {!isSelectedQuestLocked && isSelectedActive && !isSelectedCompleted && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-600/40 px-2.5 py-1 rounded">
                    En cours
                  </span>
                )}
              </div>

              {/* Message d'avertissement si chapitre verrouille */}
              {isSelectedQuestLocked && (
                <div className="p-3 mb-4 rounded bg-red-950/30 border border-red-900/50 text-red-300 text-xs flex items-center gap-2">
                  <GiPadlock className="text-lg shrink-0 text-red-400" />
                  <span>Terminez toutes les quetes du Chapitre {selectedQuest.chapter - 1} pour deverrouiller ce chapitre.</span>
                </div>
              )}

              {/* Description */}
              <p className="quest-detail-description text-gray-300 text-sm leading-relaxed mb-6">
                {selectedQuest.description}
              </p>

              {/* Objets requis / Drop Slot */}
              {selectedQuest.objectives?.length > 0 && (
                <div className="mb-6">
                  <h6 className="title-ingredient uppercase text-xs tracking-wider text-gray-400 border-b border-gray-800 pb-1 mb-3">
                    Objets Requis
                  </h6>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedQuest.objectives.slice(0, 2).map((objective) => {
                      const currentProgress = questProgress[selectedQuest.id]?.[objective.itemId] || 0;
                      const isComplete = currentProgress >= objective.quantity;
                      const isHovered = dragOverItemId === objective.itemId;

                      return (
                        <div
                          key={objective.itemId}
                          onDragOver={(e) => isSelectedActive && !isComplete && !isSelectedQuestLocked && handleDragOver(e, objective.itemId)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => isSelectedActive && !isComplete && !isSelectedQuestLocked && handleDrop(e, objective)}
                          className={`objective-slot p-3 rounded border flex flex-col items-center text-center transition-all ${
                            isSelectedQuestLocked
                              ? "bg-gray-950/40 border-gray-900 opacity-40"
                              : isComplete
                              ? "bg-emerald-950/20 border-emerald-600/40"
                              : isHovered
                              ? "bg-purple-900/40 border-purple-400"
                              : isSelectedActive
                              ? "bg-purple-950/20 border-dashed border-purple-700/50 cursor-pointer"
                              : "bg-gray-900/40 border-gray-800 opacity-60"
                          }`}
                        >
                          <div className="w-10 h-10 rounded border border-purple-500/30 bg-black/40 flex items-center justify-center mb-1 text-gray-400">
                            {isComplete ? (
                              <GiCheckMark className="text-emerald-400 text-lg" />
                            ) : (
                              <GiBoxUnpacking className="text-purple-400 text-lg" />
                            )}
                          </div>
                          <span className="text-xs text-gray-200 font-medium truncate max-w-full">
                            {objective.name}
                          </span>
                          <span
                            className={`text-xs font-bold mt-1 ${
                              isComplete ? "text-emerald-400" : "text-purple-300"
                            }`}
                          >
                            {currentProgress} / {objective.quantity}
                          </span>
                          {isSelectedActive && !isComplete && !isSelectedQuestLocked && (
                            <span className="text-[10px] text-gray-400 mt-1 italic">
                              Deposez l item ici
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recompenses */}
              <div className="mb-6">
                <h6 className="title-ingredient uppercase text-xs tracking-wider text-gray-400 border-b border-gray-800 pb-1 mb-2">
                  Recompenses
                </h6>
                <div className="quest-detail-rewards flex items-center gap-6 mt-2">
                  <span className="inline-flex items-center gap-2 quest-gold font-bold">
                    <GiTwoCoins className="text-2xl text-amber-400" />
                    {selectedQuest.rewards.gold} Gold
                  </span>
                  <span className="inline-flex items-center gap-2 quest-xp font-bold">
                    <GiStarsStack className="text-2xl text-purple-400" />
                    +{selectedQuest.rewards.xp} XP
                  </span>
                </div>
              </div>
            </div>

            {/* Bouton d'action */}
            <div className="mt-auto pt-4 border-t border-gray-800/80">
              {isSelectedQuestLocked ? (
                <button disabled className="quest-start-btn is-locked w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded">
                  <GiPadlock /> Chapitre Verrouille
                </button>
              ) : isSelectedCompleted ? (
                <button disabled className="quest-start-btn is-completed w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded">
                  <GiCheckMark /> Quete Terminee
                </button>
              ) : isSelectedReadyToComplete ? (
                <button
                  onClick={handleFinishQuest}
                  className="quest-start-btn is-ready w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded animate-pulse"
                >
                  <GiCheckMark /> Terminer la quete
                </button>
              ) : isSelectedActive ? (
                <button disabled className="quest-start-btn is-active w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded">
                  <GiHourglass className="animate-spin-slow" /> En cours
                </button>
              ) : (
                <button
                  onClick={handleAcceptQuest}
                  className="quest-start-btn w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded transition-all duration-300"
                >
                  Accepter la quete
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Selectez une quete dans le journal.
          </div>
        )}
      </div>
    </div>
  );
};

export default Quests;