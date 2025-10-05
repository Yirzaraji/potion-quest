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

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("drag over");
  };

  /* const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    console.log("draggedIndex");
    //if (draggedIndex === null) return;
    const updatedItems = [...items];
    const draggedItem = items[draggedIndex];

    if (draggedIndex !== index) {
      updatedItems[draggedIndex] = null;
      updatedItems[index] = draggedItem;
      setItems(updatedItems);
    }
  }; */

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("draggedIndex");
    const updatedItems = [...items];

    // Prevent dropping on the same cell
    if (draggedIndex === index.toString()) return;

    // Swap items if the target cell is occupied, otherwise place the dragged item
    if (updatedItems[index]) {
      // Swap items
      [updatedItems[draggedIndex], updatedItems[index]] = [updatedItems[index], updatedItems[draggedIndex]];
    } else {
      // Place dragged item in empty cell
      updatedItems[index] = updatedItems[draggedIndex];
      updatedItems[draggedIndex] = null;
    }

    setItems(updatedItems);
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
              className={`item-box flex justify-center items-center hover:border-blue-500 border-4 bg-gray-500 m-1`}
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
