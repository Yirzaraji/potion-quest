import React from "react";

/**
 * Contenu de tooltip pour un item de jeu (utilisable dans l'inventaire, le
 * shop, les recettes, etc.). Affiche uniquement les champs présents sur
 * l'item (un item sans prix d'achat n'affiche pas de ligne "Achat", etc.).
 */
const ItemTooltipContent = ({ item }) => {
  if (!item) return null;

  return (
    <div className="item-tooltip-content">
      <p className="item-tooltip-title">{item.name}</p>

      {typeof item.price === "number" && (
        <p className="item-tooltip-line">
          <span>Achat</span>
          <span>{item.price} or</span>
        </p>
      )}

      {typeof item.sellPrice === "number" && (
        <p className="item-tooltip-line">
          <span>Revente</span>
          <span>{item.sellPrice} or</span>
        </p>
      )}

      {item.quantity > 1 && (
        <p className="item-tooltip-line">
          <span>Quantité</span>
          <span>{item.quantity}</span>
        </p>
      )}
    </div>
  );
};

export default ItemTooltipContent;