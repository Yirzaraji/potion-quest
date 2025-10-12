import React, { Fragment, useState } from "react";
import { PiFlowerTulipFill } from "react-icons/pi";
import { GiFlowerStar } from "react-icons/gi";
import {
  GiTwoCoins,
  GiHealthPotion,
  GiPotionBall,
  GiPotionOfMadness,
} from "react-icons/gi";
import "./Inventory.css";

const Inventory = () => {
  //const userDatas = JSON.parse(localStorage.getItem("userDatas"));

  const initialItems = [
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
  ];
  const [items, setItems] = useState(initialItems);
  const [startIndex, setStartIndex] = useState(null);

  const handleDragStart = (e, index) => {
    console.log(index)
    setStartIndex(index); // Stocke l'index comme nombre plutot qu'utiliser e.dataTransfer.setData("startIndex", index); qui donne une string
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("drag over");
  };
  /* const handleDragStart = (e, index) => {
    e.dataTransfer.setData("startIndex", index);
  }; */


  /* const handleDrop = (e, index) => {
    const startIndex = e.dataTransfer.getData("startIndex");
    console.log("startIndex");
    //if (startIndex === null) return;
    const updatedItems = [...items];
    const draggedItem = items[startIndex];

    if (startIndex !== index) {
      updatedItems[startIndex] = null;
      updatedItems[index] = draggedItem;
      setItems(updatedItems);
    }
  }; */

  const handleDrop = (e, endIndex) => {
      //Si cellule identique
    if (startIndex === null || startIndex === endIndex) return;

    const updatedItems = [...items];
    if (updatedItems[endIndex]) {
      // Swap si cellule occupée
      [updatedItems[startIndex], updatedItems[endIndex]] = [updatedItems[endIndex], updatedItems[startIndex]]; 
    } else {
      // Sinon déplacement
      updatedItems[endIndex] = updatedItems[startIndex];
      updatedItems[startIndex] = null;
    }

    setItems(updatedItems);
    setStartIndex(null); // Réinitialise après le drag drop
  };
  

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
      <div className="inventory-items flex flex-wrap mt-1 mb-5">
        {items.map((item, index) => {
          //const item = items.find((item) => item.id === index);
          return (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`item-box flex justify-center items-center hover:border-blue-900 border-4 bg-gray-900 m-1`}
            >
              {/* slot {index + 1} */}
              {item && (
                <div
                  id={index}
                  onDragStart={(e) => handleDragStart(e, index)}
                  draggable={true}
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

export default Inventory;
