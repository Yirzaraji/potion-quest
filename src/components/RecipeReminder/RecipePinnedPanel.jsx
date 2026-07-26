import React from "react";
import { useRecipeReminder } from "@/hooks/useRecipeReminder";
import "./RecipeReminder.css";

export const RecipePinnedPanel = () => {
  const { pinnedRecipe, unpinRecipe } = useRecipeReminder();

  if (!pinnedRecipe) return null;

  return (
    <div className="recipe-pinned-reminder text-white">
      <div className="recipe-pinned-reminder-header flex justify-between items-center">
        <h5 className="uppercase">{pinnedRecipe.title}</h5>
        <button
          type="button"
          className="recipe-pinned-reminder-close"
          aria-label="Fermer le pense-bête"
          onClick={unpinRecipe}
        >
          ×
        </button>
      </div>
      <div className="recipe-pinned-reminder-ingredients">
        {pinnedRecipe.ingredients.map((ingredient, index) => {
          const IngredientIcon = ingredient.icon;
          return (
            <div key={index} className="recipe-pinned-reminder-ingredient">
              <IngredientIcon className="recipe-pinned-reminder-icon" />
              <span className="recipe-pinned-reminder-name">{ingredient.name}</span>
              <span className="recipe-pinned-reminder-qty">x{ingredient.quantity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};