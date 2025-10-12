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

const GameData = {
  items:{
    diluents: [
      {
        id: 0,
        name: "Vin",
        price: 50,
        sellPrice: 25,
        icon: FaWineBottle,
      },
      {
        id: 1,
        name: "Eau",
        price: 50,
        sellPrice: 25,
        icon: FaBottleWater,
      },
      {
        id:2,
        name: "Huile",
        price: 50,
        sellPrice: 25,
        icon: FaOilCan,
      },
    ],
    herbs: [
      {
        id: 0,
        name: "Pétale de rose",
        price: 50,
        sellPrice: 25,
        icon: PiFlowerTulipFill,
        isTransform: false,
      },
      {
        id: 1,
        name: "Flacon vide",
        price: 50,
        sellPrice: 25,
        icon: GiClothJar,
        isTransform: false,
      },
      {
        id: 2,
        name: "Hibiscus",
        price: 50,
        sellPrice: 25,
        icon: GiHerbsBundle,
        isTransform: false,
      },
      {
        id: 3,
        name: "Racine de mandragore",
        price: 50,
        sellPrice: 25,
        icon: GiTreeRoots,
        isTransform: false,
      },
      {
        id: 4,
        name: "Pissenlit",
        price: 50,
        sellPrice: 25,
        icon: GiFlowerEmblem,
        isTransform: false,
      },
      {
        id: 5,
        name: "Feuillereve",
        price: 50,
        sellPrice: 25,
        icon: GiZigzagLeaf,
        isTransform: false,
      },
      {
        id: 6,
        name: "Feuille de bellombre",
        price: 50,
        sellPrice: 25,
        icon: GiLeafSkeleton,
        isTransform: false,
      },
      {
        id: 7,
        name: "Essence de Noxsombre",
        price: 50,
        sellPrice: 25,
        icon: GiDeathcab,
        isTransform: false,
      },
      {
        id: 8,
        name: "Dent de Lion",
        price: 50,
        sellPrice: 25,
        icon: GiFrontTeeth,
        isTransform: false,
      },
      {
        id: 9,
        name: "Fleur ardente",
        price: 50,
        sellPrice: 25,
        icon: GiSunflower,
        isTransform: false,
      },
      {
        id: 10,
        name: "Essence de Jasmin",
        price: 50,
        sellPrice: 25,
        icon: GiJasmine,
        isTransform: false,
      },
    ],
    potions: [
      {
        id: 0,
        name: "Potion de Lune",
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 1,
        name: "Potion de vie",
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 2,
        name: "Potion de souffle mortel",
        sellPrice: 150,
        icon: GiPotionOfMadness,
      },
      {
        id: 3,
        name: "Potion du Hardi",
        sellPrice: 150,
        icon: GiPotionBall,
      },
      {
        id: 4,
        name: "Elixir d'amour",
        sellPrice: 150,
        icon: GiHealthPotion,
      },
    ],
  },
};

export default GameData;