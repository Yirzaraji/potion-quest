import React, { Fragment, useState, useEffect, useRef } from "react";
import GameData from '@/components/GameDatas/Items';
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
import "@/components/Modal/Shared/ItemGrid.css";
import "./shop.css";

const Shop = ({
  shopCoins,
  handleCoinsChange,
  inventoryCoins,
  inventoryCoinsChange,
  addItemToInventory,
}) => {
  const { showToast } = useToast();
  const [shopItems, setShopItems] = useState([]);
  // État pour les slots (fixe à 63)
  const [shopSlots] = useState(Array.from({ length: 63 }));

  useEffect(() => {
    const loadItems = () => {
      try {
        // Vérifier que GameData et items existent
        if (!GameData || !GameData.items) {
          console.error("GameData ou items est undefined");
          setShopItems([]);
        }
        const { items } = GameData;
        // Vérifier que les catégories existent
        if (!items.potions || !items.diluents || !items.herbs) {
          console.error("Une catégorie d'items est manquante :", {
            potions: items.potions,
            diluents: items.diluents,
            herbs: items.herbs,
          });
          setShopItems([]);
        }
        // Fusion des items — on garde leurs id fixes du catalogue tels quels,
        // on ne les recalcule plus jamais à partir de leur position ici.
        const mergedItems = items.potions.concat(items.diluents).concat(items.herbs);
        setShopItems(mergedItems);
      } catch (error) {
        console.error("Erreur lors du chargement des items :", error);
        setShopItems([]);
      }
    };
    loadItems();
  }, []); // Dépendance vide pour exécuter une seule fois au montage

  // Achat d'un item du shop au clic droit : vérifie le prix, débite la banque du
  // joueur (inventoryCoins) et envoie une copie de l'item dans l'inventaire.
  const handleBuyItem = (event, index) => {
    event.preventDefault(); // empêche le menu contextuel du navigateur

    const item = shopItems[index];
    if (!item) return;

    // Certains items (ex: les potions, qui n'ont qu'un sellPrice) n'ont pas de
    // prix d'achat défini : ils ne sont pas en vente dans la boutique.
    if (typeof item.price !== "number") {
      showToast(`${item.name} n'est pas en vente.`, "error");
      return;
    }

    if (inventoryCoins < item.price) {
      showToast("Or insuffisant pour acheter cet objet.", "error");
      return;
    }

    // Débite la banque du joueur, crédite la banque du shop du même montant
    inventoryCoinsChange(inventoryCoins - item.price);
    handleCoinsChange(shopCoins + item.price);

    // Envoie une copie de l'item dans l'inventaire avec un identifiant unique
    // (évite toute collision avec un item déjà présent dans l'inventaire)
    addItemToInventory({
      ...item,
      uid: `${item.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });

    showToast(`${item.name} acheté (-${item.price} or)`, "success");
  };

  // Debug
  useEffect(() => {
    console.log("shopItems mis à jour :", shopItems);
  }, [shopItems]);

  return (
    <Fragment>
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
        {shopItems.length > 0 ? (
          shopSlots.map((_, index) => {
            const item = index < shopItems.length ? shopItems[index] : null;
            return (
              <div
                key={index}
                onContextMenu={(event) => handleBuyItem(event, index)}
                data-sfx-hover={item?.icon ? "hover" : undefined}
                className={`item-slot ${item?.icon ? "item-slot-filled" : ""}`}
              >
                {item?.icon ? (
                  (() => {
                    const Icon = item.icon;
                    return (
                      <Tooltip content={<ItemTooltipContent item={item} />}>
                        <div className="item cursor-move">
                          <Icon style={{ fontSize: "2.2rem", color: "white" }} />
                        </div>
                      </Tooltip>
                    );
                  })()
                ) : (
                  <div className="item empty-slot"></div>
                )}
              </div>
            );
          })
        ) : (
          <p>Chargement des items...</p>
        )}
      </div>
      <hr className="item-divider" />
      <div className="item-bank">
        <b>{shopCoins ?? "Chargement..."}</b>
        <GiTwoCoins
          style={{
            fontSize: "1.3rem",
            color: "#ffd75e",
          }}
        />
      </div>
    </Fragment>
  );
};

export default Shop;