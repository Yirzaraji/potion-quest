import React, { Fragment, useState } from "react";
import "./Recipes.css";

const Recipes = () => {
 const [openIndex, setOpenIndex] = useState(null); // Index de la recette ouverte

  const recipes = [
    {
      title: "Potion de Vie",
      instructions: "Mélangez 1 Fiole Vide, 2 Tulipes et 1 Feuillereve. Faites bouillir 5 minutes.",
    },
    {
      title: "Potion de Force",
      instructions: "Mélangez 1 Fiole Vide, 3 Racines et 1 Poudre de Dragon. Agitez vigoureusement.",
    },
    {
      title: "Potion d'Invisibilité",
      instructions: "Mélangez 1 Fiole Vide, 2 Feuilles Invisibles et 1 Eau Lunaire. Laissez reposer une nuit.",
    },
    {
      title: "Potion de Vitesse",
      instructions: "Mélangez 1 Fiole Vide, 1 Plume de Phénix et 2 Baies Rapides. Infusez 10 minutes.",
    },
    {
      title: "Potion de Guérison",
      instructions: "Mélangez 1 Fiole Vide, 1 Herbe Guérisseuse et 3 Gouttes de Rosée. Chauffez doucement.",
    },
  ];

  const toggleRecipe = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Ouvre/ferme, exclusif
  };

  return (
    <Fragment>
      <div className="recipes-container bg-blue">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-item text-white border-b border-blue bg-blue hover:text-purple-500">
            <div
              className="recipe-title cursor-pointer p-2 bg-blue hover:bg-white"
              onClick={() => toggleRecipe(index)}
            >
              {recipe.title}
            </div>
            {openIndex === index && (
              <div className="recipe-instructions p-2 bg-black">
                {recipe.instructions}
              </div>
            )}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Recipes;
