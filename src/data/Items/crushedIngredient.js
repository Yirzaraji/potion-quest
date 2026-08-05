import { GiMortarPestle } from "react-icons/gi";

// Les ids des versions broyees sont derives de l'id brut + cet offset,
// pour ne jamais entrer en collision avec un id d'item existant ou futur.
export const CRUSHED_ID_OFFSET = 1000;

/**
 * Derive la version "broyee" d'un ingredient brut. Utilise par Mortar
 * (pour savoir quel item ajouter a l'inventaire une fois le broyage
 * termine) et par le systeme de matching du Cauldron (pour savoir quel
 * nom chercher quand une recette demande `isCrush: true` sur cet
 * ingredient).
 */
export const getCrushedIngredient = (ingredient) => ({
  id: ingredient.id + CRUSHED_ID_OFFSET,
  name: `${ingredient.name} (broye)`,
  icon: GiMortarPestle,
  price: 0,
  sellPrice: Math.round(ingredient.sellPrice / 2),
  isCrushed: true,
  sourceId: ingredient.id,
});