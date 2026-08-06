import { useState } from "react";
import "./Mortar.css";

const Mortar = ({ onDropIngredient }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const itemData = event.dataTransfer.getData("application/json");
    if (!itemData) return;

    try {
      const draggedItem = JSON.parse(itemData); // { itemId, quantity }
      onDropIngredient(draggedItem.itemId);
    } catch (err) {
      console.error("Erreur lors du drop sur le mortier", err);
    }
  };

  return (
    <div className="mortar-wrapper">
      <button
        type="button"
        className={`mortar-btn ${isDragOver ? "mortar-btn-hover" : ""}`}
        aria-label="Mortier"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      ></button>
    </div>
  );
};

export default Mortar;