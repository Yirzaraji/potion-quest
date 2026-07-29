import { Fragment, useState, useEffect } from "react";
import gameBackground from "@/assets/game.png";
import { FaWineBottle } from "react-icons/fa";
import { PiFlowerTulipFill } from "react-icons/pi";
import { GiClothJar, GiPotionBall } from "react-icons/gi";
import GameData from "@/data/Items";
import { GAME_QUESTS, isChapterUnlocked, getCurrentChapterIndex } from "@/data/Quests";
import { getLevelFromXp, getXpProgressPercent } from "@/utils/playerProgress";
import Menu from "@/components/Menu";
import "./Game.css";
import MusicPlayer from "@/components/MusicPlayer";
import PlayerHud from "@/components/PlayerHud";
import Creation from "@/components/Modal/Creation";
import { ToastProvider } from "@/context/ToastContext";
import { ToastStack } from "@/components/Toast/ToastStack";
import { RecipeReminderProvider } from "@/context/RecipeReminderContext";
import { RecipePinnedPanel } from "@/components/RecipeReminder/RecipePinnedPanel";
import SfxListener from "@/components/Sfx/SfxListener";

const Game = () => {

  const [isBgLoaded, setIsBgLoaded] = useState(false);
  useEffect(() => {
    // Duree minimale d'affichage du spinner (ms)
    const MIN_SPINNER_DURATION_MS = 1000;
    const startTime = performance.now();

    const reveal = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(MIN_SPINNER_DURATION_MS - elapsed, 0);
      setTimeout(() => setIsBgLoaded(true), remaining);
    };

    const img = new Image();
    img.src = gameBackground;
    if (img.complete) {
      reveal();
    } else {
      img.onload = reveal;
    }
  }, []);

  const [buyItems, setBuyItems] = useState([]);
  const [shopCoins, setShopCoins] = useState(10000);
  const [inventoryCoins, setInventoryCoins] = useState(500);  const [inventoryItems, setInventoryItems] = useState([
      {
        id: 0,
        name: "Vin",
        price: 50,
        sellPrice: 25,
        icon: FaWineBottle,
      },
      {
        id: 1,
        name: "Pétale de rose",
        price: 50,
        sellPrice: 25,
        icon: PiFlowerTulipFill,
        isTransform: false,
      },
      {
        id: 2,
        name: "Flacon vide",
        price: 50,
        sellPrice: 25,
        icon: GiClothJar,
        isTransform: false,
      },
      // TODO(dev): seed temporaire pour tester le drag&drop des quetes sans
      // attendre le systeme de craft. A retirer une fois le Chaudron code.
      ...GameData.items.questPotions.map((potion) => ({ ...potion, quantity: 1 })),
    ]);

  // --- Progression du joueur (leve depuis Modal/Quests, qui n'a plus de
  // state a lui : ce sont des VIEWS pilotees d'ici, comme inventoryItems). ---

  // Quetes acceptees / en cours
  const [activeQuestIds, setActiveQuestIds] = useState([]);

  // Quetes accomplies/terminees
  const [completedQuestIds, setCompletedQuestIds] = useState([]);

  // Avancement des objets deposes par quete : { [questId]: { [itemId]: quantite } }
  const [questProgress, setQuestProgress] = useState({});

  // XP cumulee du joueur. Le niveau et le % de la barre d'XP ne sont JAMAIS
  // stockes a part : ce sont des vues pures sur ce seul nombre (voir
  // utils/playerProgress), pour ne jamais pouvoir se desynchroniser.
  const [playerXp, setPlayerXp] = useState(0);

  const handleCoinsChange = (value) => {
    setShopCoins(value);
  }

  const inventoryCoinsChange = (value) => {
    setInventoryCoins(value)
  }

  const addItemToInventory = (itemToAdd) => {
    setInventoryItems((prevItems) => {
      // Cherche si un item du même nom est déjà présent dans l'inventaire (empilable)
      const existingIndex = prevItems.findIndex(
        (invItem) => invItem && invItem.name === itemToAdd.name
      );

      if (existingIndex !== -1) {
        // Déjà présent -> on incrémente la quantité de la pile existante
        // au lieu de prendre une nouvelle case d'inventaire.
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
        return updatedItems;
      }

      // Nouvel item -> nouvelle case, quantité initiale de 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  // le shop : crédite le joueur du sellPrice et débite ce même montant de la
  // banque du shop, puis retire une unité de l'inventaire (ou l'item entier si
  // c'était le dernier exemplaire). Ne modifie jamais le catalogue du shop.
  // Retourne { success, sellPrice, reason } pour permettre à l'UI d'afficher
  // le bon message 
  const sellItemFromInventory = (itemName) => {
    const index = inventoryItems.findIndex(
      (invItem) => invItem && invItem.name === itemName
    );
    if (index === -1) return { success: false, reason: "not_found" };

    const item = inventoryItems[index];
    const sellPrice = typeof item.sellPrice === "number" ? item.sellPrice : 0;

    if (shopCoins < sellPrice) {
      return { success: false, reason: "shop_insufficient_funds" };
    }

    const quantity = item.quantity || 1;
    const updatedItems = [...inventoryItems];
    if (quantity > 1) {
      // Il reste des exemplaires -> on décrémente juste la pile
      updatedItems[index] = { ...item, quantity: quantity - 1 };
    } else {
      // Dernier exemplaire -> l'item disparaît complètement de l'inventaire
      updatedItems.splice(index, 1);
    }
    setInventoryItems(updatedItems);
    setInventoryCoins((prevCoins) => prevCoins + sellPrice);
    setShopCoins((prevShop) => prevShop - sellPrice);

    return { success: true, sellPrice };
  };

  // Retire une quantite d'un item de l'inventaire, par id (pas par name : cf
  // discussion archi, id est la cle stable). Contrairement a
  // sellItemFromInventory, ne credite AUCUN or : remettre un objet a un PNJ
  // pour une quete n'est pas une vente.
  const removeItemFromInventory = (itemId, quantity = 1) => {
    setInventoryItems((prevItems) => {
      const index = prevItems.findIndex((item) => item && item.id === itemId);
      if (index === -1) return prevItems;

      const item = prevItems[index];
      const currentQuantity = item.quantity || 1;

      if (currentQuantity > quantity) {
        const updatedItems = [...prevItems];
        updatedItems[index] = { ...item, quantity: currentQuantity - quantity };
        return updatedItems;
      }

      // Plus assez (ou plus du tout) d'exemplaires -> l'item disparait
      return prevItems.filter((_, i) => i !== index);
    });
  };

  // Accepte une quete (passe de "visible" a "active")
  const handleAcceptQuest = (questId) => {
    setActiveQuestIds((prev) => (prev.includes(questId) ? prev : [...prev, questId]));
  };

  // Depot d'un item dans un slot d'objectif de quete (drag&drop depuis
  // l'inventaire). Un seul point qui touche a la fois questProgress ET
  // inventoryItems : exactement pourquoi cette logique vit ici et pas dans
  // Modal/Quests, qui n'a acces a aucun des deux directement.
  const handleDepositQuestItem = (questId, objective, draggedItem) => {
    if (!draggedItem || draggedItem.itemId !== objective.itemId) return;

    const currentAmount = questProgress[questId]?.[objective.itemId] || 0;
    const missing = objective.quantity - currentAmount;
    if (missing <= 0) return;

    const amountToDeposit = Math.min(draggedItem.quantity || 1, missing);
    if (amountToDeposit <= 0) return;

    removeItemFromInventory(objective.itemId, amountToDeposit);
    setQuestProgress((prev) => {
      const currentQuestData = prev[questId] || {};
      return {
        ...prev,
        [questId]: {
          ...currentQuestData,
          [objective.itemId]: (currentQuestData[objective.itemId] || 0) + amountToDeposit,
        },
      };
    });
  };

  // Rend une quete terminee : credite l'or (meme banque que le Shop, pas de
  // monnaie parallele) et l'XP (voir utils/playerProgress pour le niveau).
  const handleFinishQuest = (questId) => {
    const quest = GAME_QUESTS.find((q) => q.id === questId);
    if (!quest) return;

    setActiveQuestIds((prev) => prev.filter((id) => id !== questId));
    setCompletedQuestIds((prev) => (prev.includes(questId) ? prev : [...prev, questId]));
    setInventoryCoins((prev) => prev + (quest.rewards?.gold || 0));
    setPlayerXp((prev) => prev + (quest.rewards?.xp || 0));
  };

  // --- Progression du joueur : toujours DERIVEE, jamais stockee a part ---
  const currentChapterIndex = getCurrentChapterIndex(completedQuestIds);
  const playerLevel = getLevelFromXp(playerXp);
  const xpProgressPercent = getXpProgressPercent(playerXp);
  
  return (
    <Fragment>
      <ToastProvider>
        <RecipeReminderProvider>
          {!isBgLoaded && (
            <div className="game-loading-screen">
              <div className="game-spinner-potion">
                <GiPotionBall className="game-spinner-icon" />
                <span className="game-spinner-bubble b1"></span>
                <span className="game-spinner-bubble b2"></span>
                <span className="game-spinner-bubble b3"></span>
              </div>
              <p className="game-loading-text">Preparation de la potion...</p>
            </div>
          )}
          <div
            className={`test backgroundImageGame back text-center ${
              isBgLoaded ? "game-visible" : ""
            }`}
          >
            <ToastStack />
            <RecipePinnedPanel />
            <Creation />
            <MusicPlayer />
            <PlayerHud
              playerLevel={playerLevel}
              xpPercent={xpProgressPercent}
              currentChapterIndex={currentChapterIndex}
            />
            <SfxListener />
            <Menu
              playerLevel={playerLevel}
              xpProgressPercent={xpProgressPercent}
              shopCoins={shopCoins}
              handleCoinsChange={handleCoinsChange}
              liftInventoryItems={inventoryItems}
              addItemToInventory={addItemToInventory}
              sellItemFromInventory={sellItemFromInventory}
              inventoryCoins={inventoryCoins}
              inventoryCoinsChange={inventoryCoinsChange}
              activeQuestIds={activeQuestIds}
              completedQuestIds={completedQuestIds}
              questProgress={questProgress}
              onAcceptQuest={handleAcceptQuest}
              onDepositQuestItem={handleDepositQuestItem}
              onFinishQuest={handleFinishQuest}
            />
          </div>
        </RecipeReminderProvider>
      </ToastProvider>
    </Fragment>
  );
};

export default Game;