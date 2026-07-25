import React, { createContext, useContext, useState } from "react";
import "./RecipeReminder.css";

const RecipeReminderContext = createContext(null);

/**
 * A monter UNE SEULE FOIS, au meme niveau que ToastProvider (dans Game),
 * le composant Recipes ne stocke plus ce state lui-meme, il ne fait qu'appeler 
 * pinRecipe()/unpinRecipe() via le hook.
 */
export const RecipeReminderProvider = ({ children }) => {
  const [pinnedRecipe, setPinnedRecipe] = useState(null);

  const pinRecipe = (recipe) => setPinnedRecipe(recipe);
  const unpinRecipe = () => setPinnedRecipe(null);

  return (
    <RecipeReminderContext.Provider value={{ pinnedRecipe, pinRecipe, unpinRecipe }}>
      {children}

      {pinnedRecipe && (
        <div className="recipe-pinned-reminder text-white">
          <div className="recipe-pinned-reminder-header flex justify-between items-center">
            <h5 className="uppercase">{pinnedRecipe.title}</h5>
            <button
              type="button"
              className="recipe-pinned-reminder-close"
              aria-label="Fermer le pense-bete"
              onClick={unpinRecipe}
            >
              ✕
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
      )}
    </RecipeReminderContext.Provider>
  );
};

/**
 * Hook a utiliser dans n'importe quel composant enfant de RecipeReminderProvider :
 * const { pinRecipe } = useRecipeReminder();
 * pinRecipe(recipe);
 */
export const useRecipeReminder = () => {
  const context = useContext(RecipeReminderContext);
  if (!context) {
    throw new Error("useRecipeReminder doit etre utilise a l'interieur d'un <RecipeReminderProvider>");
  }
  return context;
};