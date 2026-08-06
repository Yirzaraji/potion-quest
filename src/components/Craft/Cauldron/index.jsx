import { useState } from "react";
import { GiFlame } from "react-icons/gi";
import cauldronLayer from "@/assets/images/cauldron.png";
import "./Craft.css";

const Cauldron = ({ cauldronItems, onDropIngredient, onRemoveIngredient, onLightFire }) => {
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
      onDropIngredient(draggedItem);
    } catch (err) {
      console.error("Erreur lors du drop sur le chaudron", err);
    }
  };

  return (
    <div className="cauldron-wrapper">
      <div
        className="cauldron-layer"
        style={{ backgroundImage: `url(${cauldronLayer})` }}
      ></div>

      <button
        type="button"
        className={`cauldron-btn ${isDragOver ? "cauldron-btn-hover" : ""}`}
        aria-label="Chaudron"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      ></button>

      {/* Petite fenetre informative : contenu actuel du chaudron */}
      <div className="cauldron-panel">
        <h6 className="cauldron-panel-title">Chaudron</h6>

        {cauldronItems.length === 0 ? (
          <p className="cauldron-panel-empty">Deposez des ingredients ici.</p>
        ) : (
          <ul className="cauldron-panel-list">
            {cauldronItems.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className="cauldron-panel-item"
                  onClick={() => onRemoveIngredient(item.id)}
                  title="Cliquer pour retirer"
                >
                  <Icon className="cauldron-panel-icon" />
                  <span className="cauldron-panel-name">{item.name}</span>
                  {item.quantity > 1 && (
                    <span className="cauldron-panel-qty">x{item.quantity}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <button
          type="button"
          className="cauldron-fire-btn"
          onClick={onLightFire}
          disabled={cauldronItems.length === 0}
          aria-label="Allumer le feu"
        >
          <GiFlame />
        </button>
      </div>
    </div>
  );
};

export default Cauldron;