import React, { Fragment, useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal/Base";
import Profil from "@/components/Modal/Profil";
import Inventory from "@/components/Modal/Inventory";
import Shop from "@/components/Modal/Shop";
import Recipes from "@/components/Modal/Recipes";
import { FaBook } from "react-icons/fa6";
import "./Menu.css";

const CASCADE_OFFSET = 32;
const BASE_X = 260;
const BASE_Y = 80;

const Menu = ({ playerLevel, shopCoins, handleCoinsChange, liftInventoryItems, addItemToInventory, inventoryCoins, inventoryCoinsChange }) => {
  // openWindows: { [id]: { position: {x, y}, zIndex } } -> une entrée par fenêtre ouverte
  const [openWindows, setOpenWindows] = useState({});
  const zIndexCounter = useRef(10);
  const [menuBtn, setMenuBtn] = useState([
    {
      id:0,
      icon: <FaBook/>,
      name: "Shop",
      component: <Shop shopCoins={shopCoins} handleCoinsChange={handleCoinsChange}/>
    },
    {
      id: 1,
      icon: <FaBook/>,
      name: "Inventaire",
      component: <Inventory prop="hellothere" liftInventoryItems={liftInventoryItems} 
        addItemToInventory={addItemToInventory} inventoryCoins={inventoryCoins} inventoryCoinsChange={inventoryCoinsChange}/>,
    },
    {
      id: 2,
      icon: <FaBook/>,
      name: "Recettes",
      component: <Recipes />,
    },
    {
      id: 3,
      icon: <FaBook/>,
      name: "Quete",
      component: <Profil />,
    },
    {
      id: 4,
      icon: <FaBook/>,
      name: "Profil",
      component: <Profil playerLevel={playerLevel} />,
    },
    {
      id: 5,
      icon: <FaBook/>,
      name: "Aides",
      component: <Profil />,
    },
  ]);

  //re render quand shopCoins se met a jour
  useEffect(() => {
    setMenuBtn([
      {
        id: 0,
        icon: <FaBook />,
        name: "Shop",
        component: <Shop shopCoins={shopCoins} handleCoinsChange={handleCoinsChange} />
      },
      {
        id: 1,
        icon: <FaBook/>,
        name: "Inventaire",
        component: <Inventory prop="hellothere" liftInventoryItems={liftInventoryItems} 
        addItemToInventory={addItemToInventory} inventoryCoins={inventoryCoins} inventoryCoinsChange={inventoryCoinsChange}/>,
      },
      {
        id: 2,
        icon: <FaBook/>,
        name: "Recettes",
        component: <Recipes />,
      },
      {
        id: 3,
        icon: <FaBook/>,
        name: "Quete",
        component: <Profil />,
      },
      {
        id: 4,
        icon: <FaBook/>,
        name: "Profil",
        component: <Profil playerLevel={playerLevel} />,
      },
      {
        id: 5,
        icon: <FaBook/>,
        name: "Aides",
        component: <Profil />,
      },
    ]);
  }, [shopCoins]);

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
  // Contrairement à l'ancien système, ouvrir une fenêtre ne ferme plus les autres.
  const handleClick = (event, index) => {
    const { id } = menuBtn[index];
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

  return (
    <Fragment>
      <div className="bg-gray-800 sidebar flex flex-col justify-center opacity-95">
        <ul>
          {menuBtn.map((btn, index) => {
            return (
              <li
                key={index}
                onClick={(event) => handleClick(event, index)}
                className={`bg-blue-500 mb-2 text-center ${
                  openWindows[btn.id] ? "bg-green-500" : "bg-blue-500"
                } cursor-pointer pt-2 pb-2 hover:bg-green-500`}
              >
                {btn.icon}{btn.name}
              </li>
            );
          })}
        </ul>
      </div>
      {Object.entries(openWindows).map(([idKey, windowState]) => {
        const id = Number(idKey);
        const btn = menuBtn.find((menuItem) => menuItem.id === id);
        if (!btn) return null;
        return (
          <Modal
            key={id}
            name={btn.name}
            width={btn.name === "Shop" ? "645px" : undefined} // Largeur de modal spécifique pour Shop
            defaultPosition={windowState.position}
            zIndex={windowState.zIndex}
            onClose={() => closeWindow(id)}
            onFocus={() => bringToFront(id)}
          >
            {btn.component}
          </Modal>
        );
      })}
    </Fragment>
  );
};

export default Menu;