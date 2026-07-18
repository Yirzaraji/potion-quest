import React, { Fragment, useState, useEffect, useRef } from "react";
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
import Tooltip from "@/components/Tooltip";
import ItemTooltipContent from "@/components/Tooltip/ItemTooltipContent";
import "./Inventory.css";

const Inventory = ({liftInventoryItems, addItemToInventory, sellItemFromInventory, inventoryCoins, inventoryCoinsChange}) => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  console.log(liftInventoryItems)
  const [initialSlots] = useState(Array.from({ length: 42 }));
  const [inventoryItems, setInventoryItems] = useState([]);

  // Petit retour visuel après une vente (succès ou erreur), auto-effacé après 2s
  const [feedback, setFeedback] = useState(null); // { text: string, type: "success" | "error" }
  const feedbackTimeoutRef = useRef(null);

  const showFeedback = (text, type = "success") => {
    setFeedback({ text, type });
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 2000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
      //console.log(purchasedItems)
      setInventoryItems(liftInventoryItems)
  }, [liftInventoryItems]);

  //DEBUG ASYNCHRONE
  useEffect(() => {
    console.log(inventoryItems)
  }, [inventoryItems]);

  const handleDragStart = (event, index) => {
    if (inventoryItems[index] === null) return; // Ne drag pas les slots vides
    event.dataTransfer.setData('text/plain', index.toString());
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
  
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log("drag over");
  };

  // Vente d'un item de l'inventaire au clic droit : crédite le joueur du
  // sellPrice de l'item (le shop est débité du même montant). Bloqué si le
  // shop n'a pas assez d'or pour racheter l'objet.
  const handleSellItem = (event, index) => {
    event.preventDefault(); // empêche le menu contextuel du navigateur

    const item = inventoryItems[index];
    if (!item) return;

    if (typeof item.sellPrice !== "number") {
      showFeedback(`${item.name} ne peut pas être vendu.`, "error");
      return;
    }

    const result = sellItemFromInventory(item.name);
    if (!result.success) {
      if (result.reason === "shop_insufficient_funds") {
        showFeedback("Le shop n'a pas assez d'or pour racheter cet objet.", "error");
      } else {
        showFeedback(`Impossible de vendre ${item.name}.`, "error");
      }
      return;
    }

    showFeedback(`${item.name} vendu (+${result.sellPrice} or)`, "success");
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
      {feedback && (
        <p className={`inventory-feedback mt-1 mb-0 text-sm ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {feedback.text}
        </p>
      )}
      <div className="inventory-items flex flex-wrap mt-1 mb-5">
        {inventoryItems.length > 0 ? (
          initialSlots.map((_, index) => {
            return(
              <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onContextMenu={(event) => handleSellItem(event, index)}
                  className="item-box flex justify-center items-center hover:border-blue-900 border-4 bg-gray-900 m-1"                 
                >
                  {index < inventoryItems.length && inventoryItems[index]?.icon ? (
                    (() => {
                      const item = inventoryItems[index];
                      const Icon = item.icon;
                      const quantity = item.quantity || 1;
                      return (
                        <Tooltip content={<ItemTooltipContent item={item} />}>
                          <div
                            id={index}
                            onDragStart={(e) => handleDragStart(e, index)}
                            draggable={true}
                            className="item cursor-move"
                          >
                            <Icon style={{ fontSize: "2.5rem", color: "white" }} />
                            {quantity > 1 && (
                              <span className="item-quantity-badge">x{quantity}</span>
                            )}
                          </div>
                        </Tooltip>
                      );
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
        <b>{inventoryCoins}</b>
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