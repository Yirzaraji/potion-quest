import React, { Fragment, useState } from "react";
import recipes from "@/data/Recipes";
import { useRecipeReminder } from "@/hooks/useRecipeReminder";
import Tooltip from "@/components/Tooltip";
import "./Recipes.css";

const Recipes = () => {
  const [openIndex, setOpenIndex] = useState(null); // Index de la recette ouverte
 const { pinnedRecipe, pinRecipe, unpinRecipe } = useRecipeReminder();

  const toggleRecipe = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Ouvre/ferme
  };

  return (
    <Fragment>
      <div className="recipes-container overflow-y-auto max-h-[540px]">
        {recipes.map((recipe, index) => {
          const PotionIcon = recipe.icon;
          return (
            <div key={index} className="recipe-item text-white">
              <div
                className={`recipe-title flex cursor-pointer p-2 hover:bg-purple-900 duration-500 ${
                  openIndex === index ? "bg-purple-900" : ""
                }`}
                onClick={() => toggleRecipe(index)}
              >
                <div className="recipe-decription-icon flex items-center">
                  {PotionIcon && <PotionIcon className="recipe-potion-icons" />}
                </div>
                <div className="recipe-description-container ml-3 font-BBH-Sans-Hegarty">
                  <h4>{recipe.title}</h4>
                  <p>{recipe.description}</p>
                </div>
              </div>
              <div
                className={`recipe-content ${
                  openIndex === index ? "open" : "closed"
                }`}
              >
                <div className="recipe-instructions text-justify p-5">
                  <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                    Description
                  </h6>
                  {recipe.instructions}
                </div>
                <div className="recipe-ingredients p-5 mb-2">
                  <h6 className="title-ingredient uppercase border-b border-gray-600 mb-2 w-full">
                    Ingredients
                  </h6>
                  <div className="ingredients-container flex items-center gap-4">
                    <div className="ingredients border-r border-gray-600">
                      {recipe.ingredients.map((ingredient, index) => {
                        const IngredientIcon = ingredient.icon;
                        return (
                          <Tooltip key={index} content={<span>{ingredient.name}</span>}>
                            <span className="inline-flex items-end mr-3 mt-3 mb-3">
                              <IngredientIcon className="text-5xl" /> x{ingredient.quantity}
                            </span>
                          </Tooltip>
                        );
                      })}
                    </div>
                    <div
                      className="recipe-reminder cursor-pointer"
                      onClick={() =>
                        pinnedRecipe === recipe ? unpinRecipe() : pinRecipe(recipe)
                      }
                    >
                      <div className="btn-reminder p-5 text-center">
                        {pinnedRecipe === recipe ? "Ne plus suivre" : "Suivre"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pinnedRecipe && (
        <div className="recipe-pinned-reminder text-white">
          <div className="recipe-pinned-reminder-header flex justify-between items-center">
            <h5>{pinnedRecipe.title}</h5>
            <button
              type="button"
              className="recipe-pinned-reminder-close"
              aria-label="Fermer le pense-bete"
              onClick={() => setPinnedRecipe(null)}
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
                  <span className="recipe-pinned-reminder-name">
                    {ingredient.name}
                  </span>
                  <span className="recipe-pinned-reminder-qty">
                    x{ingredient.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Recipes;