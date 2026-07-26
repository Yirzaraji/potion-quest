import { useContext } from "react";
import { RecipeReminderContext } from "@/context/RecipeReminderContext";

export const useRecipeReminder = () => {
  const context = useContext(RecipeReminderContext);
  if (!context) {
    throw new Error("useRecipeReminder doit être utilisé à l'intérieur d'un <RecipeReminderProvider>");
  }
  return context;
};