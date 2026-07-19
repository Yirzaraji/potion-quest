import React, { Fragment, useState, useRef } from "react";
import Modal from "@/components/Modal/Base";
import Profil from "@/components/Modal/Profil";
import Inventory from "@/components/Modal/Inventory";
import Shop from "@/components/Modal/Shop";
import Recipes from "@/components/Modal/Recipes";
import Quests from "@/components/Modal/Quests";
import Tooltip from "@/components/Tooltip";
import { GiShop, GiBackpack, GiOpenBook, GiScrollUnfurled, GiPerson } from "react-icons/gi";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Menu.css";

const CASCADE_OFFSET = 32;
const BASE_X = 260;
const BASE_Y = 80;

const MENU_ITEMS = [
  { id: 0, icon: <GiShop style={{ fontSize: "2rem" }} />, name: "Shop" },
  { id: 1, icon: <GiBackpack style={{ fontSize: "2rem" }} />, name: "Inventaire" },
  { id: 2, icon: <GiOpenBook style={{ fontSize: "2rem" }} />, name: "Recettes" },
  { id: 3, icon: <GiScrollUnfurled style={{ fontSize: "2rem" }} />, name: "Quete" },
  { id: 4, icon: <GiPerson style={{ fontSize: "2rem" }} />, name: "Profil" },
  { id: 5, icon: <FaCircleQuestion style={{ fontSize: "2rem" }} />, name: "Aide" },
];

const Menu = ({
  playerLevel,
  shopCoins,
  handleCoinsChange,
  liftInventoryItems,
  addItemToInventory,
  sellItemFromInventory,
  inventoryCoins,
  inventoryCoinsChange,
}) => {
  // openWindows: { [id]: { position: {x, y}, zIndex } } -> une entrée par fenêtre ouverte
  const [openWindows, setOpenWindows] = useState({});
  const zIndexCounter = useRef(10);

  // Position en cascade pour qu'une nouvelle fenêtre n'apparaisse pas exactement
  // au même endroit qu'une fenêtre déjà ouverte.
  const getNextPosition = (openCount) => {
    const step = openCount % 8;
    return {
      x: BASE_X + step * CASCADE_OFFSET,
      y: BASE_Y + step * CASCADE_OFFSET,
    };
  };

  const bringToFront = (id) => {
    zIndexCounter.current += 1;
    const nextZ = zIndexCounter.current;
    setOpenWindows((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], zIndex: nextZ } } : prev
    );
  };

  const closeWindow = (id) => {
    setOpenWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Clic sur un bouton du menu : ouvre la fenêtre si elle est fermée
  // (et la met au premier plan), ou la ferme si elle est déjà ouverte.
  // Ouvrir une fenêtre ne ferme plus les autres (plus de toggle exclusif).
  const handleClick = (index) => {
    const { id } = MENU_ITEMS[index];
    setOpenWindows((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      zIndexCounter.current += 1;
      return {
        ...prev,
        [id]: {
          position: getNextPosition(Object.keys(prev).length),
          zIndex: zIndexCounter.current,
        },
      };
    });
  };

  // Construit le contenu réel affiché dans la fenêtre correspondant à l'id.
  // Recalculé à chaque rendu -> toujours les props les plus récentes.
  const renderModalContent = (id) => {
    switch (id) {
      case 0:
        return (
          <Shop
            shopCoins={shopCoins}
            handleCoinsChange={handleCoinsChange}
            inventoryCoins={inventoryCoins}
            inventoryCoinsChange={inventoryCoinsChange}
            addItemToInventory={addItemToInventory}
          />
        );
      case 1:
        return (
          <Inventory
            liftInventoryItems={liftInventoryItems}
            addItemToInventory={addItemToInventory}
            sellItemFromInventory={sellItemFromInventory}
            inventoryCoins={inventoryCoins}
            inventoryCoinsChange={inventoryCoinsChange}
          />
        );
      case 2:
        return <Recipes />;
      case 3:
        return <Quests />;
      case 4:
        return <Profil playerLevel={playerLevel} />;
      case 5:
        return <Profil />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <div className="sidebar flex flex-col justify-center">
        <ul>
          {MENU_ITEMS.map((btn, index) => (
            <li key={btn.id}>
              <Tooltip content={btn.name} placement="left">
                <button
                  type="button"
                  onClick={() => handleClick(index)}
                  aria-label={btn.name}
                  className={`menu-btn ${openWindows[btn.id] ? "menu-btn-active" : ""}`}
                >
                  {btn.icon}
                </button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
      {Object.entries(openWindows).map(([idKey, windowState]) => {
        const id = Number(idKey);
        const btn = MENU_ITEMS.find((menuItem) => menuItem.id === id);
        if (!btn) return null;
        return (
          <Modal
            key={id}
            name={btn.name}
            width={
              btn.name === "Shop"
                ? "645px"
                : btn.name === "Quete"
                ? "950px"
                : undefined
            }
            defaultPosition={windowState.position}
            zIndex={windowState.zIndex}
            onClose={() => closeWindow(id)}
            onFocus={() => bringToFront(id)}
          >
            {renderModalContent(id)}
          </Modal>
        );
      })}
    </Fragment>
  );
};

export default Menu;