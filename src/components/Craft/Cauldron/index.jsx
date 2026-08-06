import { useState } from "react";
import { GiFlame, GiGears } from "react-icons/gi";
import { BsGearFill } from "react-icons/bs";
import cauldronLayer from "@/assets/images/cauldron.png";
import "./Cauldron.css";

const MIX_DURATION_MS = 3000;

const Cauldron = ({ cauldronItems, onDropIngredient, onRemoveIngredient, onLightFire }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isMixing, setIsMixing] = useState(false);

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
      const draggedItem = JSON.parse(itemData);
      onDropIngredient(draggedItem);
    } catch (err) {
      console.error("Erreur lors du drop sur le chaudron", err);
    }
  };

  const handleFireClick = () => {
    if (isMixing || cauldronItems.length === 0) return;
    setIsMixing(true);
    setTimeout(() => {
      onLightFire();
      setIsMixing(false);
    }, MIX_DURATION_MS);
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

      {/* Fenetre d'info : ne s'affiche que si des ingredients sont presents */}
      {cauldronItems.length > 0 && (
        <div className="cauldron-panel">
          <h6 className="cauldron-panel-title">
            <BsGearFill className="cauldron-panel-gear" />
            Chaudron
          </h6>
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
        </div>
      )}

      {/* Bouton "allumer le feu", independant de la fenetre d'info,
          positionne sous le chaudron */}
      <div className="cauldron-fire-zone">
        <button
          type="button"
          className={`cauldron-fire-btn ${isMixing ? "cauldron-fire-btn-active" : ""}`}
          onClick={handleFireClick}
          disabled={cauldronItems.length === 0 || isMixing}
          aria-label="Allumer le feu"
        >
          <GiFlame />
        </button>
        {isMixing && (
          <p className="cauldron-fire-label">
            Mixture en train d'etre melangee...
          </p>
        )}
      </div>
    </div>
  );
};

export default Cauldron;