import React, { useState } from "react";

function IngredientsForm() {
  // Initialize the ingredients state
  const [ingredients, setIngredients] = useState([]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your code here...
  };

  // Function to handle adding a new ingredient to the list
  const addIngredient = (e) => {
    // Your code here...
    setIngredients((prevIngredients) => [...prevIngredients, e.value]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name={`ingredient-${index}`}
            value={ingredient}
            onChange={(e) => {
              // Your code here...
            }}
          />
          <button
            type="button"
            onClick={() => {
              // Your code here...
            }}
          >
            Remove Ingredient
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
      <button type="submit">Get Recipes</button>
    </form>
  );
}

export default IngredientsForm;
