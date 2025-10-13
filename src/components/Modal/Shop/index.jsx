import React, { Fragment, useState, useEffect } from "react";
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

const Shop = () => {

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

  useEffect(() => {
    //recuperation des items achetés
    const handleClick = () =>{
      //logic here
    }
  }, []);

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
      <div className="shop-items flex flex-wrap mt-1 mb-5">
        {shopItems.length > 0 ? (
          shopSlots.map((_, index) => (
            <div
              key={index}
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
        <b>1439 </b>
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