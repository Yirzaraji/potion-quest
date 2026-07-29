import React, { Fragment, useState, useMemo } from "react";
import { GiScrollUnfurled, GiStarsStack, GiTwoCoins, GiHourglass, GiCheckMark, GiPotionBall, GiPadlock } from "react-icons/gi";
import { GAME_QUESTS, CHAPTERS, isChapterUnlocked } from "@/data/Quests";
import fallbackGiverAvatar from "@/assets/images/characters/messager.png";
import "./Quests.css";

/* Petites repliques generiques que le donneur de quete peut prononcer pour
solliciter l'aide du joueur. */
const buildGiverLines = (quest) => {
  const objectiveName = quest.objectives?.[0]?.name;
  if (objectiveName) {
    return [
      `On m'a parle de votre talent... j'ai grand besoin d'une' : ${objectiveName}.`,
      `S'il vous plait, aidez-moi ! Il me faut absolument une ${objectiveName}.`,
      `Je n'ai nulle part ailleurs ou me tourner. Pourriez-vous preparer une ${objectiveName} ?`,
      `Chaque instant compte... apportez-moi une ${objectiveName}, je vous en supplie.`,
    ];
  }
  return [
    `J'ai besoin de votre aide pour une ${quest.title}.`,
    `Pourriez-vous m'aider ? Il s'agit de une ${quest.title}.`,
  ];
};

const Quests = ({
  activeQuestIds,
  completedQuestIds,
  questProgress,
  onAcceptQuest,
  onDepositQuestItem,
  onFinishQuest,
}) => {
  const [openChapterIndex, setOpenChapterIndex] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState(CHAPTERS[0]?.quests[0]?.id ?? null);

  // Feedback visuel du drag (purement local a l'UI, pas de raison de le lever)
  const [dragOverItemId, setDragOverItemId] = useState(null);

  const selectedQuest = GAME_QUESTS.find((quest) => quest.id === selectedQuestId);

  const isSelectedActive = activeQuestIds.includes(selectedQuestId);
  const isSelectedCompleted = completedQuestIds.includes(selectedQuestId);

  // Verifie si la quete selectionnee est dans un chapitre verrouille
  const isSelectedQuestLocked = selectedQuest
    ? !isChapterUnlocked(selectedQuest.chapter, completedQuestIds)
    : true;

  // Verifie si tous les objets d'une quete ont ete deposes
  const checkIfQuestIsReadyToComplete = (quest) => {
    if (!quest || !quest.objectives || quest.objectives.length === 0) return true;
    const progress = questProgress[quest.id] || {};
    return quest.objectives.every((obj) => (progress[obj.itemId] || 0) >= obj.quantity);
  };

  const isSelectedReadyToComplete = isSelectedActive && checkIfQuestIsReadyToComplete(selectedQuest);

  // Replique du donneur de quete, stable tant que la meme quete reste selectionnee
  const giverLine = useMemo(() => {
    if (!selectedQuest) return "";
    const lines = buildGiverLines(selectedQuest);
    return lines[Math.floor(Math.random() * lines.length)];
  }, [selectedQuest]);

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
      onAcceptQuest(selectedQuestId);
    }
  };

  const handleFinishQuest = () => {
    onFinishQuest(selectedQuestId);
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
    if (!itemData) return;

    try {
      const draggedItem = JSON.parse(itemData); // { itemId, quantity }
      onDepositQuestItem(selectedQuestId, objective, draggedItem);
    } catch (err) {
      console.error("Erreur lors du drop de l item", err);
    }
  };

  return (
    <div className="quests-layout relative flex rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#141a1e]">
      {/* Colonne gauche : Liste des quetes et chapitres */}
      <div className="quests-chapters-column overflow-y-auto w-1/2 border-r border-gray-800/80">
        {CHAPTERS.map((chapter, chapterIndex) => {
          const unlocked = isChapterUnlocked(chapter.chapter, completedQuestIds);
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
                    ? "active-chapter cursor-pointer"
                    : "cursor-pointer"
                }`}
                onClick={() => toggleChapter(chapterIndex, unlocked)}
              >
                <div className="flex items-center">
                  <div className={`chapter-description-icon flex items-center ${unlocked ? "text-gray-300" : "text-gray-600"}`}>
                    {unlocked ? <GiScrollUnfurled className="text-3xl" /> : <GiPadlock className="text-2xl text-gray-500" />}
                  </div>
                  <div className="chapter-description-container ml-3">
                    <h4 className={`chapter-title-text text-xl ${unlocked ? "" : "text-gray-500"}`}>
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
                      className={`quest-list-item flex items-center justify-between py-2.5 px-4 pl-6 text-base transition-all ${
                        !unlocked
                          ? "locked cursor-not-allowed opacity-40"
                          : "cursor-pointer"
                      } ${isSelected ? "active" : ""}`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span
                          className={`quest-status-dot ${
                            isCompleted ? "is-completed" : isActive ? "is-active" : "is-pending"
                          }`}
                        />
                        <span className="truncate">{quest.title}</span>
                      </span>
                      {isCompleted && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <GiCheckMark /> Terminee
                        </span>
                      )}
                      {isActive && !isCompleted && (
                        <span className="tracker-quest-status-left border rounded flex items-center gap-1">
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
      <div className="quests-details-column p-4 text-white w-1/2 flex flex-col justify-between overflow-y-auto">
        {selectedQuest ? (
          <div key={selectedQuest.id} className="quest-detail-fade flex flex-col h-full justify-between">
            <div>
              {/* Titre & Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                <h3 className="quest-detail-title">
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
                  <span className="tracker-quest-status tracking-wider rounded flex items-center gap-2">
                    <GiHourglass className="animate-spin-slow" />En cours
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

              {/* Donneur de quete : avatar + bulle de dialogue, meme esprit que le vendeur du Shop */}
              {!isSelectedQuestLocked && selectedQuest.questGiver && (
                <div className="quest-giver-header">
                  <div className="quest-giver-avatar-wrap">
                    <img
                      src={selectedQuest.questGiver.avatarUrl || fallbackGiverAvatar}
                      alt={selectedQuest.questGiver.name}
                      className="quest-giver-avatar"
                    />
                  </div>
                  <div className="quest-giver-info">
                    <span className="quest-giver-name text-xl">{selectedQuest.questGiver.name}</span>
                    <span className="quest-giver-role">Donneur de quete</span>
                  </div>
                  <div className="quest-giver-bubble">
                    <p>{giverLine}</p>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="quest-detail-description text-gray-400 leading-relaxed mb-6">
                {selectedQuest.description}
              </p>

              {/* Objets requis / Drop Slot */}
              {(isSelectedActive || isSelectedCompleted) && selectedQuest.objectives?.length > 0 && (
                <div className="required-quest-items">
                  <h6 className="title-ingredient pb-1 mb-3">
                    Objets requis
                  </h6>
                  <div className="flex flex-col gap-3">
                    {selectedQuest.objectives.slice(0, 2).map((objective) => {
                      const currentProgress = questProgress[selectedQuest.id]?.[objective.itemId] || 0;
                      const isComplete = currentProgress >= objective.quantity;
                      const isHovered = dragOverItemId === objective.itemId;
                      const progressPct = Math.min(100, Math.round((currentProgress / objective.quantity) * 100));

                      return (
                        <div key={objective.itemId} className="objective-row">
                          {/* Boite carree : uniquement l'icone, c'est la zone de drop */}
                          <div
                            onDragOver={(e) => isSelectedActive && !isComplete && !isSelectedQuestLocked && handleDragOver(e, objective.itemId)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => isSelectedActive && !isComplete && !isSelectedQuestLocked && handleDrop(e, objective)}
                            className={`objective-slot transition-all ${
                              isSelectedQuestLocked
                                ? "objective-slot-locked"
                                : isComplete
                                ? "objective-slot-complete"
                                : isHovered
                                ? "objective-slot-hovered"
                                : "objective-slot-pending"
                            }`}
                          >
                            {isComplete ? (
                              <GiCheckMark className="text-emerald-400 text-xl" />
                            ) : (
                              <GiPotionBall className={`potionball-icon-required-item-quest ${isHovered ? "text-amber-300" : "text-gray-600"}`} />
                            )}
                          </div>

                          {/* Texte sorti de la boite : nom, progression, indice de drop */}
                          <div className="objective-row-text">
                            <span className="objective-name uppercase">{objective.name}</span>
                            <div className="objective-progress-track">
                              <div
                                className={`objective-progress-fill ${isComplete ? "is-complete" : ""}`}
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                            <span className={`objective-progress-count ${isComplete ? "is-complete" : ""}`}>
                              {isComplete
                                ? "Objectif complete"
                                : `${currentProgress} / ${objective.quantity}`}
                            </span>
                            {isSelectedActive && !isComplete && !isSelectedQuestLocked && (
                              <span className="objective-hint">Deposez l'item correspondant ici</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recompenses */}
              <div className="mb-6">
                <h6 className="title-ingredient pb-1 mb-2">
                  Recompenses
                </h6>
                <div className="quest-detail-rewards flex items-center gap-3 mt-2">
                  <span className="reward-pill reward-pill-gold">
                    <span className="reward-pill-icon">
                      <GiTwoCoins />
                    </span>
                    <span className="quest-gold font-bold">{selectedQuest.rewards.gold} Or</span>
                  </span>
                  <span className="reward-pill reward-pill-xp">
                    <span className="reward-pill-icon">
                      <GiStarsStack />
                    </span>
                    <span className="quest-xp font-bold">+{selectedQuest.rewards.xp} XP</span>
                  </span>
                </div>
              </div>            </div>

            {/* Bouton d'action */}
            <div className="mt-auto pt-4 border-t border-gray-800/80">
              {isSelectedQuestLocked ? (
                <button disabled className="quest-start-btn is-locked w-full flex items-center justify-center gap-2 h-11 uppercase font-bold text-sm tracking-wider rounded">
                  <GiPadlock /> Chapitre Verrouille
                </button>
              ) : isSelectedCompleted ? (
                <button disabled className="quest-start-btn is-completed w-full flex items-center justify-center gap-2 h-11 font-bold tracking-wider rounded">
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
                <button disabled className="quest-start-btn is-active w-full flex items-center justify-center gap-2 h-11 font-bold tracking-wider rounded">
                  <GiHourglass className="animate-spin-slow" /> En cours
                </button>
              ) : (
                <button
                  onClick={handleAcceptQuest}
                  className="quest-start-btn w-full flex items-center justify-center gap-2 h-11 font-bold tracking-wider rounded transition-all duration-300"
                >
                  Accepter la quete
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="quest-empty-state flex flex-col items-center justify-center h-full text-gray-500 text-sm gap-2">
            <GiScrollUnfurled className="text-4xl text-gray-700" />
            <span>Selectez une quete dans le journal.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quests;