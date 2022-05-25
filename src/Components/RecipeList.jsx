import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const response = await fetch("/feeds/list/");
      const recipeData = await response.json();

      setRecipes(() => recipeData.feed);
    }

    loadRecipes();
  }, []);

  const listRecipes = recipes.map((recipe, index) => (
    <Recipe recipe={recipe.display} key={index} />
  ));
  return (
    <div>
      <ol>{listRecipes}</ol>
    </div>
  );
}

export default RecipeList;
