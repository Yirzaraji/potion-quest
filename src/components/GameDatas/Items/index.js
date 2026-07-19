import React from "react";
import { FaBottleWater } from "react-icons/fa6";
import { FaOilCan, FaWineBottle } from "react-icons/fa";
import { PiFlowerTulip, PiFlowerTulipFill } from "react-icons/pi";
import { RiFlowerFill } from "react-icons/ri";
import { GiFlowerStar, 
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
  GiFlowerEmblem 
} from "react-icons/gi";

// IMPORTANT : ces `id` sont fixes et permanents. Une fois qu'un item existe
// ici avec un id donné, ne JAMAIS réutiliser ce même id pour un autre item
// (même après suppression), et ne jamais laisser un composant recalculer
// ces id à partir d'une position dans un tableau (ex: `.map((item, i) => ...)`),
// sinon toute référence externe (quêtes, recettes...) pointera dans le vide.
//
// Plage 1-19 : items déjà en vente dans le shop actuel.
// Plage 101+ : réservée aux potions à venir, craftées via les quêtes
// (voir GameDatas/Quests) — quand tu ajoutes une de ces potions ici,
// donne-lui exactement l'id déjà utilisé en `itemId` dans la quête concernée.
const GameData = {
  items:{
    diluents: [
      {
        id: 1,
        name: "Vin",
        price: 50,
        sellPrice: 25,
        icon: FaWineBottle,
      },
      {
        id: 2,
        name: "Eau",
        price: 50,
        sellPrice: 25,
        icon: FaBottleWater,
      },
      {
        id: 3,
        name: "Huile",
        price: 50,
        sellPrice: 25,
        icon: FaOilCan,
      },
    ],
    herbs: [
      {
        id: 4,
        name: "Pétale de rose",
        price: 50,
        sellPrice: 25,
        icon: PiFlowerTulipFill,
        isTransform: false,
      },
      {
        id: 5,
        name: "Flacon vide",
        price: 50,
        sellPrice: 25,
        icon: GiClothJar,
        isTransform: false,
      },
      {
        id: 6,
        name: "Hibiscus",
        price: 50,
        sellPrice: 25,
        icon: GiHerbsBundle,
        isTransform: false,
      },
      {
        id: 7,
        name: "Racine de mandragore",
        price: 50,
        sellPrice: 25,
        icon: GiTreeRoots,
        isTransform: false,
      },
      {
        id: 8,
        name: "Pissenlit",
        price: 50,
        sellPrice: 25,
        icon: GiFlowerEmblem,
        isTransform: false,
      },
      {
        id: 9,
        name: "Feuillereve",
        price: 50,
        sellPrice: 25,
        icon: GiZigzagLeaf,
        isTransform: false,
      },
      {
        id: 10,
        name: "Feuille de bellombre",
        price: 50,
        sellPrice: 25,
        icon: GiLeafSkeleton,
        isTransform: false,
      },
      {
        id: 11,
        name: "Essence de Noxsombre",
        price: 50,
        sellPrice: 25,
        icon: GiDeathcab,
        isTransform: false,
      },
      {
        id: 12,
        name: "Dent de Lion",
        price: 50,
        sellPrice: 25,
        icon: GiFrontTeeth,
        isTransform: false,
      },
      {
        id: 13,
        name: "Fleur ardente",
        price: 50,
        sellPrice: 25,
        icon: GiSunflower,
        isTransform: false,
      },
      {
        id: 14,
        name: "Essence de Jasmin",
        price: 50,
        sellPrice: 25,
        icon: GiJasmine,
        isTransform: false,
      },
    ],
    potions: [
      {
        id: 15,
        name: "Potion de Lune",
        price: 0,
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 16,
        name: "Potion de vie",
        price: 0,
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 17,
        name: "Potion de souffle mortel",
        price: 0,
        sellPrice: 150,
        icon: GiPotionOfMadness,
      },
      {
        id: 18,
        name: "Potion du Hardi",
        price: 0,
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 19,
        name: "Elixir d'amour",
        price: 0,
        sellPrice: 150,
        icon: GiHealthPotion,
      },
    ],
  },
};

export default GameData;