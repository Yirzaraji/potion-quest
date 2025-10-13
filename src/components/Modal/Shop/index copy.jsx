import React, { Fragment, useState } from "react";
import GameData from '@/components/GameDatas/Items';
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
import "./shop.css";

const Shop = () => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  //const [startIndex, setStartIndex] = useState(null);

  const { items } = GameData;
  const mergedItems = items.potions.concat(items.diluents).concat(items.herbs)
  const shopItems = mergedItems.map((item, index) => ({
    id: index,
    ...item,
  }))

  console.log(shopItems)

/*   const shopItems = [
    {
      id: 0,
      name: "Fiole Vide",
      icon: (
        <GiPotionBall
          style={{
            fontSize: "3.5rem",
            color: "white",
          }}
        />
      ),
    },
    {
      id: 1,
      name: "Feuillereve",
      icon: (
        <GiFlowerStar
          style={{
            fontSize: "3.5rem",
            color: "white",
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Tulipe",
      icon: (
        <PiFlowerTulipFill
          style={{
            fontSize: "3.5rem",
            color: "white",
          }}
        />
      ),
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]; */
  const [shopSlots] = useState(Array.from({ length: 63 })); // Tableau vide en attente de recevoir les objets a lui passer.
  
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
        {shopSlots.map((_, index) => (
          <div
            key={index}
            className="item-box flex justify-center items-center hover:border-blue-900 border-4 bg-gray-900 m-1"
          >
            {index < shopItems.length && shopItems[index].icon ? (
              (() => {
                const Icon = shopItems[index].icon; // (tricky solution) Assigne a une variable qui a une majuscule pour le passer comme composant 
                return <Icon style={{fontSize: "2.5rem",color: "white",}} />;
              })()
            ) : (
              <div id={index} className="item cursor-move">
                .
              </div>
            )}
          </div>
        ))}
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
