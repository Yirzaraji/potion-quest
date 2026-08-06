import recipes from "@/data/Recipes";
import GameData from "@/data/Items";
import { getCrushedIngredient } from "@/data/Items/crushedIngredient";

const ALL_RAW_INGREDIENTS = [
  ...GameData.items.diluents,
  ...GameData.items.ingredients,
];

// Resout le nom EXACT qu'un ingredient de recette doit avoir dans le
// chaudron, en tenant compte du broyage (isCrush).
const resolveExpectedName = (recipeIngredient) => {
  if (!recipeIngredient.isCrush) return recipeIngredient.name;

  const rawItem = ALL_RAW_INGREDIENTS.find(
    (item) => item.name === recipeIngredient.name
  );
  if (!rawItem) return recipeIngredient.name;

  return getCrushedIngredient(rawItem).name;
};

// Trouve la recette qui correspond exactement au contenu du chaudron
// (memes ingredients, memes quantites, rien en trop, rien en moins).
const findMatchingRecipe = (cauldronItems) => {
  return (
    recipes.find((recipe) => {
      if (recipe.ingredients.length !== cauldronItems.length) return false;

      return recipe.ingredients.every((recipeIngredient) => {
        const expectedName = resolveExpectedName(recipeIngredient);
        const cauldronMatch = cauldronItems.find(
          (item) => item.name === expectedName
        );
        if (!cauldronMatch) return false;
        return (cauldronMatch.quantity || 1) >= recipeIngredient.quantity;
      });
    }) || null
  );
};

/* Retrouve l'id de la "potion" correspondante a l'id "potionId" de la recette
dans questPotions. Renvoie null si la recette n'a pas (encore) d'item associe */
const findOutputItem = (recipe) => {
  if (!recipe.potionId) return null;
  return (
    GameData.items.questPotions.find((potion) => potion.id === recipe.potionId) ||
    null
  );
};
/**
 * Tente de crafter a partir du contenu actuel du chaudron.
 * Renvoie { success: false } si aucune recette ne correspond, ou si la
 * recette correspondante n'a pas d'item de recompense associe.
 * Renvoie { success: true, recipe, outputItem } sinon.
 */
export const attemptCraft = (cauldronItems) => {
  const matchedRecipe = findMatchingRecipe(cauldronItems);
  if (!matchedRecipe) return { success: false };

  const outputItem = findOutputItem(matchedRecipe);
  if (!outputItem) return { success: false };

  return { success: true, recipe: matchedRecipe, outputItem };
};