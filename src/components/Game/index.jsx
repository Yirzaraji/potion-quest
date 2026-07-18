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

const Game = () => {
  const [buyItems, setBuyItems] = useState([]);
  const [shopCoins, setShopCoins] = useState(999999);
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
  

  return (
    <Fragment>
      <div className="test backgroundImageGame back text-center">
        <MusicPlayer />
        <Menu 
        playerLevel={1} 
        shopCoins={shopCoins} 
        handleCoinsChange={handleCoinsChange} 
        liftInventoryItems={inventoryItems} 
        addItemToInventory={addItemToInventory} 
        inventoryCoins={inventoryCoins}
        inventoryCoinsChange={inventoryCoinsChange} />
      </div>
    </Fragment>
  );
};

export default Game;
