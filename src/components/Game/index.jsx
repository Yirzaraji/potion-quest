import { Fragment, useState } from "react";
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
import Menu from "@/components/Menu";
import "./Game.css";
import MusicPlayer from "@/components/MusicPlayer";
import Inventory from "@/components/Modal/Inventory"
import Shop from "@/components/Modal/Shop"
import { ToastProvider } from "@/components/Toast/ToastContext";
import SfxListener from "@/components/Sfx/SfxListener";

const Game = () => {
  const [buyItems, setBuyItems] = useState([]);
  const [shopCoins, setShopCoins] = useState(10000);
  const [inventoryCoins, setInventoryCoins] = useState(1789);
  const [inventoryItems, setInventoryItems] = useState([
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
    ]);

  const handleCoinsChange = (value) => {
    setShopCoins(value);
  }

  const inventoryCoinsChange = (value) => {
    setInventoryCoins(value)
  }

  const addItemToInventory = (itemToAdd) => {
    setInventoryItems((prevItems) => {
      // Cherche si un item du même nom est déjà présent dans l'inventaire (empilable)
      const existingIndex = prevItems.findIndex(
        (invItem) => invItem && invItem.name === itemToAdd.name
      );

      if (existingIndex !== -1) {
        // Déjà présent -> on incrémente la quantité de la pile existante
        // au lieu de prendre une nouvelle case d'inventaire.
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        };
        return updatedItems;
      }

      // Nouvel item -> nouvelle case, quantité initiale de 1
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  // Vend un exemplaire de l'item (identifié par son nom) depuis l'inventaire vers
  // le shop : crédite le joueur du sellPrice et débite ce même montant de la
  // banque du shop, puis retire une unité de l'inventaire (ou l'item entier si
  // c'était le dernier exemplaire). Ne modifie jamais le catalogue du shop.
  // Retourne { success, sellPrice, reason } pour permettre à l'UI d'afficher
  // le bon message (ex: le shop n'a pas assez d'or pour racheter l'objet).
  const sellItemFromInventory = (itemName) => {
    const index = inventoryItems.findIndex(
      (invItem) => invItem && invItem.name === itemName
    );
    if (index === -1) return { success: false, reason: "not_found" };

    const item = inventoryItems[index];
    const sellPrice = typeof item.sellPrice === "number" ? item.sellPrice : 0;

    if (shopCoins < sellPrice) {
      return { success: false, reason: "shop_insufficient_funds" };
    }

    const quantity = item.quantity || 1;
    const updatedItems = [...inventoryItems];
    if (quantity > 1) {
      // Il reste des exemplaires -> on décrémente juste la pile
      updatedItems[index] = { ...item, quantity: quantity - 1 };
    } else {
      // Dernier exemplaire -> l'item disparaît complètement de l'inventaire
      updatedItems.splice(index, 1);
    }
    setInventoryItems(updatedItems);
    setInventoryCoins((prevCoins) => prevCoins + sellPrice);
    setShopCoins((prevShop) => prevShop - sellPrice);

    return { success: true, sellPrice };
  };
  

  return (
    <Fragment>
      <ToastProvider>
        <div className="test backgroundImageGame back text-center">
          <MusicPlayer />
          <SfxListener />
          <Menu 
          playerLevel={1} 
          shopCoins={shopCoins} 
          handleCoinsChange={handleCoinsChange} 
          liftInventoryItems={inventoryItems} 
          addItemToInventory={addItemToInventory} 
          sellItemFromInventory={sellItemFromInventory}
          inventoryCoins={inventoryCoins}
          inventoryCoinsChange={inventoryCoinsChange} />
        </div>
      </ToastProvider>
    </Fragment>
  );
};

export default Game;