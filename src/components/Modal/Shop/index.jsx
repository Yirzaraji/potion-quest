import React, { Fragment, useState, useEffect, useMemo } from "react";
import GameData from '@/data/Items';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import Tooltip from "@/components/Tooltip";
import ItemTooltipContent from "@/components/Tooltip/ItemTooltipContent";
import { useToast } from "@/hooks/useToast";
import vendorAvatar from "@/assets/images/vendor.png"; // ← Import de l'avatar
import "@/components/Modal/Shared/ItemGrid.css";
import "./shop.css";

// Petites répliques d'accueil de Gallywix, tirées au sort à chaque ouverture du shop
const MERCHANT_GREETINGS = [
  "Bienvenue, bienvenue ! Gallywix a toujours quelque chose pour vous...",
  "Entrez donc, mes étagères débordent de trouvailles !",
  "Ah, un client ! J'espère que vos poches sont aussi pleines que mon échoppe.",
  "Curieux ou acheteur, peu importe... tant que vous repartez avec quelque chose !",
  "Prenez votre temps, mais pas trop, le temps c'est de l'or !",
  "Chaque fiole a son histoire... et son prix, évidemment.",
];

const Shop = ({ shopCoins, handleCoinsChange, inventoryCoins, inventoryCoinsChange, addItemToInventory }) => {
  const { showToast } = useToast();
  const [shopItems, setShopItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [shopSlots] = useState(Array.from({ length: 63 }));
  // Figée au montage : la réplique ne change pas tant que la fenêtre reste ouverte
  const merchantGreeting = useMemo(
    () => MERCHANT_GREETINGS[Math.floor(Math.random() * MERCHANT_GREETINGS.length)],
    []
  );

  useEffect(() => {
    const loadItems = () => {
      try {
        if (!GameData || !GameData.items) {
          console.error("GameData ou items est undefined");
          setShopItems([]);
        }
        const { items } = GameData;
        if (!items.potions || !items.diluents || !items.ingredients) {
          console.error("Une catégorie d'items est manquante :", {
            potions: items.potions,
            diluents: items.diluents,
            ingredients: items.ingredients,
          });
          setShopItems([]);
        }
        const mergedItems = items.potions.concat(items.diluents).concat(items.ingredients);
        setShopItems(mergedItems);
      } catch (error) {
        console.error("Erreur lors du chargement des items :", error);
        setShopItems([]);
      }
    };
    loadItems();
  }, []);

  const filteredItems = shopItems.filter((item) =>
    item && item.name && item.name.toLowerCase().includes(searchTerm)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleBuyItem = (event, index) => {
    event.preventDefault();
    const item = filteredItems[index];
    if (!item) return;
    if (typeof item.price !== "number") {
      showToast(`${item.name} n'est pas en vente.`, "error");
      return;
    }
    if (inventoryCoins < item.price) {
      showToast("Or insuffisant pour acheter cet objet.", "error");
      return;
    }
    inventoryCoinsChange(inventoryCoins - item.price);
    handleCoinsChange(shopCoins + item.price);
    addItemToInventory({
      ...item,
      uid: `${item.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });
    showToast(`${item.name} acheté (-${item.price} or)`, "success");
  };

  useEffect(() => {
    console.log("shopItems mis à jour :", filteredItems);
  }, [filteredItems]);

  return (
    <Fragment>
      <div onContextMenu={(event) => event.preventDefault()}>
        {/* ✅ En-tête avec l'avatar, le nom, le titre du commerçant et sa bulle de dialogue */}
        <div className="shop-merchant-header">
          <div className="shop-merchant-avatar-wrap">
            <img
              src={vendorAvatar}
              alt="Commercant Gallywix"
              className="shop-merchant-avatar"
            />
          </div>
          <div className="shop-merchant-info">
            <h3 className="shop-merchant-name">Gallywix l'ancien</h3>
            <p className="shop-merchant-title">Marchand de potions &amp; ingrédients rares</p>
          </div>
          <div className="shop-merchant-bubble">
            <p>{merchantGreeting}</p>
          </div>
        </div>

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
    </Fragment>
  );
};

export default Shop;