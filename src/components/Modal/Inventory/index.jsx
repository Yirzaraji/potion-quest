import React, { Fragment, useState, useEffect } from "react";
import { FaBottleWater, FaMagnifyingGlass } from "react-icons/fa6";
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
import { useToast } from "@/components/Toast/ToastContext";
import { playSfx } from "@/components/Sfx/SfxManager";
import "@/components/Modal/Shared/ItemGrid.css";
import "./Inventory.css";

const Inventory = ({liftInventoryItems, addItemToInventory, sellItemFromInventory, inventoryCoins, inventoryCoinsChange}) => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  console.log(liftInventoryItems)
  const { showToast } = useToast();
  const [initialSlots] = useState(Array.from({ length: 42 }));
  const [inventoryItems, setInventoryItems] = useState([]);

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
    playSfx("drag");
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
    playSfx("drop");
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
      showToast(`${item.name} ne peut pas être vendu.`, "error");
      return;
    }

    const result = sellItemFromInventory(item.name);
    if (!result.success) {
      if (result.reason === "shop_insufficient_funds") {
        showToast("Le shop n'a pas assez d'or pour racheter cet objet.", "error");
      } else {
        showToast(`Impossible de vendre ${item.name}.`, "error");
      }
      return;
    }

    showToast(`${item.name} vendu (+${result.sellPrice} or)`, "success");
  };

  return (
    <div onContextMenu={(event) => event.preventDefault()}>
      <div className="item-search-bar mb-2">
        <FaMagnifyingGlass className="item-search-icon" />
        <input
          className="item-search-input"
          placeholder="Rechercher un objet..."
          type="text"
          name="searchbar"
          id="searchbar"
        />
      </div>
      <hr className="item-divider" />
      <div className="item-grid mt-2 mb-4">
        {inventoryItems.length > 0 ? (
          initialSlots.map((_, index) => {
            const item = index < inventoryItems.length ? inventoryItems[index] : null;
            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onContextMenu={(event) => handleSellItem(event, index)}
                data-sfx-hover={item?.icon ? "hover" : undefined}
                className={`item-slot ${item?.icon ? "item-slot-filled" : ""}`}
              >
                {item?.icon ? (
                  (() => {
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
                          <Icon style={{ fontSize: "2.2rem", color: "white" }} />
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
      <hr className="item-divider" />
      <div className="item-bank">
        <b>{inventoryCoins}</b>
        <GiTwoCoins
          style={{
            fontSize: "1.3rem",
            color: "#ffd75e",
          }}
        />
      </div>
    </div>
  );
};

export default Inventory;