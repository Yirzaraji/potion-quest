import React, { Fragment, useState, useEffect } from "react";
import GameData from '@/data/Items';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import Tooltip from "@/components/Tooltip";
import ItemTooltipContent from "@/components/Tooltip/ItemTooltipContent";
import { useToast } from "@/hooks/useToast";
import "@/components/Modal/Shared/ItemGrid.css";
import "./shop.css";

const Shop = ({ shopCoins, handleCoinsChange, inventoryCoins, inventoryCoinsChange, addItemToInventory }) => {
  const { showToast } = useToast();
  const [shopItems, setShopItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        // Fusion des items
        const mergedItems = items.potions.concat(items.diluents).concat(items.herbs);
        setShopItems(mergedItems);
      } catch (error) {
        console.error("Erreur lors du chargement des items :", error);
        setShopItems([]);
      }
    };
    loadItems();
  }, []); // Dépendance vide pour exécuter une seule fois au montage

  // Filtre les items en fonction du terme de recherche
  const filteredItems = shopItems.filter((item) =>
    item && item.name && item.name.toLowerCase().includes(searchTerm)
  );

  // Gestionnaire pour le champ de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Achat d'un item du shop au clic droit
  const handleBuyItem = (event, index) => {
    event.preventDefault(); // empêche le menu contextuel du navigateur

    const item = filteredItems[index];
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
    addItemToInventory({
      ...item,
      uid: `${item.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });

    showToast(`${item.name} acheté (-${item.price} or)`, "success");
  };

  // Debug
  useEffect(() => {
    console.log("shopItems mis à jour :", filteredItems);
  }, [filteredItems]);

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
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <hr className="item-divider" />
      <div className="item-grid mt-2 mb-4">
        {filteredItems.length > 0 || searchTerm === "" ? (
          shopSlots.map((_, index) => {
            const item = index < filteredItems.length ? filteredItems[index] : null;
            return (
              <div
                key={index}
                onContextMenu={(event) => handleBuyItem(event, index)}
                data-sfx-hover={item?.icon ? "hover" : undefined}
                data-sfx-rightclick={item?.icon ? "click" : undefined}
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
          <p>Aucun item trouvé.</p>
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
    </div>
  );
};

export default Shop;