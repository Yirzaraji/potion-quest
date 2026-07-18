import React, { Fragment, useState, useEffect, useRef } from "react";
import GameData from '@/components/GameDatas/Items';
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
import "./shop.css";

const Shop = ({
  shopCoins,
  handleCoinsChange,
  inventoryCoins,
  inventoryCoinsChange,
  addItemToInventory,
}) => {
  const [shopItems, setShopItems] = useState([]);
  // État pour les slots (fixe à 63)
  const [shopSlots] = useState(Array.from({ length: 63 }));

  // Petit retour visuel après un achat (succès ou erreur), auto-effacé après 2s
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
        // Fusion des items et remapping des ID du tableau apres concatenation
        const mergedItems = items.potions.concat(items.diluents).concat(items.herbs);
        const mappedId = mergedItems.map((item, index) => ({
          id: index,
          ...item,
        }));
        setShopItems(mappedId);
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
      showFeedback(`${item.name} n'est pas en vente.`, "error");
      return;
    }

    if (inventoryCoins < item.price) {
      showFeedback("Or insuffisant pour acheter cet objet.", "error");
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

    showFeedback(`${item.name} acheté (-${item.price} or)`, "success");
  };

  // Debug
  useEffect(() => {
    console.log("shopItems mis à jour :", shopItems);
  }, [shopItems]);

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
        <p className={`shop-feedback mt-1 mb-0 text-sm ${feedback.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {feedback.text}
        </p>
      )}
      <div className="shop-items flex flex-wrap mt-1 mb-5">
        {shopItems.length > 0 ? (
          shopSlots.map((_, index) => (
            <div
              key={index}
              onContextMenu={(event) => handleBuyItem(event, index)}
              title={
                index < shopItems.length && shopItems[index]
                  ? typeof shopItems[index].price === "number"
                    ? `${shopItems[index].name} — ${shopItems[index].price} or (clic droit pour acheter)`
                    : shopItems[index].name
                  : undefined
              }
              className="item-box flex justify-center items-center hover:border-blue-900 border-4 bg-gray-900 m-1"
            >
              {index < shopItems.length && shopItems[index]?.icon ? (
                (() => {
                  const Icon = shopItems[index].icon;
                  return <Icon style={{ fontSize: "2.5rem", color: "white" }} />;
                })()
              ) : (
                <div id={index} className="item cursor-move">
                  .
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Chargement des items...</p>
        )}
      </div>
      <hr />
      <div className="inventory-bank text-right">
        <b>{shopCoins ?? "Chargement..."}</b>
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

export default Shop;