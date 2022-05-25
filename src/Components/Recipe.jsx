import React from "react";

function Recipe(recipe, key) {
  const { displayName, images, source, flag } = recipe.recipe;

  return (
    <li key={key}>
      <h3>Recipe Name: {displayName}</h3>
      <img src={images} alt={displayName} />
      <h5>Article: {flag}</h5>
      <a href={source}>
        <h5>Source</h5>
      </a>
    </li>
  );
}

export default Recipe;
