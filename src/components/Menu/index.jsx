import React, { Fragment, useState, useEffect } from "react";
import Modal from "@/components/Modal/Base";
import Profil from "@/components/Modal/Profil";
import Inventory from "@/components/Modal/Inventory";
import Shop from "@/components/Modal/Shop";
import Recipes from "@/components/Modal/Recipes";
import { FaBook } from "react-icons/fa6";
import "./Menu.css";

const Menu = ({ playerLevel, shopCoins, handleCoinsChange, liftInventoryItems, addItemToInventory, inventoryCoins, inventoryCoinsChange }) => {
  const [selectedBtn, setSelectedBtn] = useState(null);
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

  //console.log(menuBtn[3].inventory);
  const handleClick = (event, index) => {
    setSelectedBtn(index);
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
                  selectedBtn === index ? "bg-green-500" : "bg-blue-500"
                } cursor-pointer pt-2 pb-2 hover:bg-green-500`}
              >
                {btn.icon}{btn.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`${selectedBtn !== null ? "" : "hidden"} container-modal`}
      >
        <Modal 
          name={menuBtn[selectedBtn]?.name}
          width={menuBtn[selectedBtn]?.name === "Shop" ? "645px" : undefined} // Largeur de modal spécifique pour Shop
        >
          {selectedBtn !== null ? menuBtn[selectedBtn].component : ""}
        </Modal>
      </div>
    </Fragment>
  );
};

export default Menu;
