import React, { createContext, useState } from "react";

const RecipeReminderContext = createContext(null);

export const RecipeReminderProvider = ({ children }) => {
  const [pinnedRecipe, setPinnedRecipe] = useState(null);

  const pinRecipe = (recipe) => setPinnedRecipe(recipe);
  const unpinRecipe = () => setPinnedRecipe(null);

  return (
    <RecipeReminderContext.Provider value={{ pinnedRecipe, pinRecipe, unpinRecipe }}>
      {children}
    </RecipeReminderContext.Provider>
  );
};

// Export du Context pour le hook (mais le hook lui-même sera dans src/hooks/)
export { RecipeReminderContext };