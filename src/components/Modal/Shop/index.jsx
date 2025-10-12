import React, { Fragment, useState } from "react";
import GameData from '@/components/GameDatas/Items';
import { PiFlowerTulipFill } from "react-icons/pi";
import { GiFlowerStar } from "react-icons/gi";
import {
  GiTwoCoins,
  GiHealthPotion,
  GiPotionBall,
  GiPotionOfMadness,
} from "react-icons/gi";
import "./shop.css";

const Shop = () => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const { items } = GameData;
  const mergedItems = items.potions.concat(items.diluents).concat(items.herbs)
  const shopitemBis = mergedItems.map((item, index) => ({
    id: index,
    ...item,
  }))
  console.log(shopitemBis)

  const shopItems = [
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
  ];
  const [itemes, setItems] = useState(shopItems);
  const [startIndex, setStartIndex] = useState(null);
  const [tests, setTests] = useState(shopitemBis);
  


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
        {tests.map((item, index) => {
            //console.log(item)
          //const item = items.find((item) => item.id === index);
          return (
            <div
              key={index}
              className={`item-box flex justify-center items-center hover:border-blue-500 border-4 bg-gray-500 m-1`}
            >
              {item && (
                <div
                id={index}
                className="item cursor-move"
                >
                {item.icon}
                </div>
              )}
            </div>
          );
        })}
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
