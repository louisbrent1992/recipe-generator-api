import React, { useState, useEffect } from "react";
import axios from "axios";

// view the full details of a particular recipe

function Recipe(props) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe from the backend
    axios.get(`/api/recipe/${props.recipeId}`).then((res) => {
      setRecipe(res.data);
    });
  }, [props.recipeId]);

  if (!recipe) {
    // Recipe is still loading
    return <p>Loading recipe...</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default Recipe;
