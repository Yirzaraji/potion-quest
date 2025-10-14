import React, { Fragment, useState, useEffect } from "react";
import { FaBottleWater } from "react-icons/fa6";
import { FaOilCan, FaWineBottle } from "react-icons/fa";
import { PiFlowerTulip, PiFlowerTulipFill } from "react-icons/pi";
import { RiFlowerFill } from "react-icons/ri";
import {
  GiFlowerStar,
  GiFrontTeeth,
  GiZigzagLeaf,
  GiDeathcab,
  GiFizzingFlask,
  GiJasmine,
  GiLeafSkeleton,
  GiSunflower,
  GiTreeRoots,
  GiClothJar,
  GiTwoCoins,
  GiHealthPotion,
  GiPotionBall,
  GiPotionOfMadness,
  GiHerbsBundle,
  GiFlowerEmblem,
} from "react-icons/gi";
import "./Inventory.css";

const Inventory = () => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const purchasedItems = [
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
  ]
  const [initialSlots] = useState(Array.from({ length: 42 }));
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
      console.log(purchasedItems)
      setInventoryItems(purchasedItems)
  }, []);

  //DEBUG ASYNCHRONE
  useEffect(() => {
    console.log(inventoryItems)
  }, [inventoryItems]);

  const handleDragStart = (e, index) => {
    if (inventoryItems[index] === null) return; // Ne drague pas les slots vides
    e.dataTransfer.setData('text/plain', index.toString());
  };
  
  const handleDrop = (e, endIndex) => {
    e.preventDefault();
    const startIndex = parseInt(e.dataTransfer.getData('text/plain'), 10); // Récupère l'index source

    if (startIndex === endIndex) {
      console.log('Drop ignoré: invalide ou même cellule');
      return;
    }
    // Clone immutable du tableau
    const updatedItems = [...inventoryItems];
    if (updatedItems[endIndex]) {
      // Swap si cellule occupée
      [updatedItems[startIndex], updatedItems[endIndex]] = [updatedItems[endIndex], updatedItems[startIndex]]; 
    } else {
      // Sinon déplacement
      updatedItems[endIndex] = updatedItems[startIndex];
      updatedItems[startIndex] = null;
    }
    setInventoryItems(updatedItems);
    console.log('Drop success: from', startIndex, 'to', endIndex);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("drag over");
  };

  return (
    <Fragment>
      <div className="inventory-search-bar mb-1">
        <input
          className="w-full p-1"
          placeholder="Search"
          type="text"
          name="searchbar"
          id="searchbar"
        />
      </div>
      <hr />
      <div className="inventory-items flex flex-wrap mt-1 mb-5">
        {inventoryItems.length > 0 ? (
          initialSlots.map((_, index) => {
            return(
              <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="item-box flex justify-center items-center hover:border-blue-900 border-4 bg-gray-900 m-1"
                >
                  {index < inventoryItems.length && inventoryItems[index]?.icon ? (
                    (() => {
                      const Icon = inventoryItems[index].icon;
                      return <Fragment><div 
                        id={index}
                        onDragStart={(e) => handleDragStart(e, index)}
                        draggable={true} 
                        className="item cursor-move">
                        <Icon style={{ fontSize: "2.5rem", color: "white" }} />
                      </div></Fragment>;
                    })()
                  ) : (
                    <div id={index} className="item empty-slot"></div>
                  )}
                </div>
              );
          })
        ) : ( <p>Chargement des items...</p> )}
      </div>
      <hr />
      <div className="inventory-bank text-right">
        <b>1439 </b>
        <GiTwoCoins
          style={{
            fontSize: "1.3rem",
            color: "yellow",
            display: "inline",
            verticalAlign: "middle",
          }}
        />
      </div>
    </Fragment>
  );
};

export default Inventory;
