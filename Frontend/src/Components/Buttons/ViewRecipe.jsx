import React, { useState } from "react";
import Recipe from "../Recipes/Recipe";

function ViewRecipe() {
  const [showModal, setShowModal] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  function handleButton() {
    setShowModal(!showModal);
  }

  console.log(showModal);

  return (
    <div>
      <button onClick={() => handleButton}>View Recipe</button>
      {showModal && <Recipe recipeId={selectedRecipeId} />}
    </div>
  );
}

export default ViewRecipe;
