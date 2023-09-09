import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	StyledButton,
	StyledForm,
	StyledHeading,
	StyledIngredientContainer,
	StyledInput,
	StyledRemoveButton,
	StyledSubmitButton,
} from "../Styles/Ingredients";

import {
	addIngredient,
	clearIngredients,
	removeIngredient,
} from "../Redux/ingredientsRedux";
import axios from "axios";
import { clearRecipe, setRecipe } from "../Redux/recipeRedux";

function Ingredients({ setLoading }) {
	const [newIngredient, setNewIngredient] = useState("");
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	const dispatch = useDispatch();

	// Inside your handleGetRecipes function
	const handleGetRecipes = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const res = await axios.post(
				"http://localhost:5050/api/v1/generate-recipe",
				{ ingredients: ingredients }
			);
			const fetchedRecipe = await res.data.result;

			// Parse the fetched recipe data if object is received
			let parsedRecipe = JSON.parse(fetchedRecipe);

			if (fetchedRecipe) {
				dispatch(clearRecipe());
				dispatch(setRecipe(parsedRecipe));
				dispatch(clearIngredients());
			} else {
				// Handle the case where no recipe data is received
				console.error("No recipe data received.");
			}
		} catch (error) {
			// Handle axios request errors here
			console.error("Error fetching recipe:", error);
		}
	};

	const addNewIngredient = () => {
		if (newIngredient.trim() !== "") {
			const ingredientToAdd = {
				_id: Math.random().toString(),
				name: newIngredient.trim(),
			};
			dispatch(addIngredient(ingredientToAdd));
			setNewIngredient("");
		}
	};

	const removeIngredientHandler = (ingredientId) => {
		dispatch(removeIngredient(ingredientId));
	};

	return (
		<StyledForm onSubmit={handleGetRecipes}>
			<StyledHeading>Ingredients</StyledHeading>
			{ingredients.map((ingredient) => (
				<StyledIngredientContainer key={ingredient._id}>
					<StyledInput
						type="text"
						name={`ingredient-${ingredient._id}`}
						value={ingredient.name}
						onChange={(e) => {
							const updatedIngredient = {
								...ingredient,
								name: e.target.value,
							};
							dispatch(addIngredient(updatedIngredient));
						}}
					/>
					<StyledRemoveButton
						type="button"
						onClick={() => {
							removeIngredientHandler(ingredient._id);
						}}
					>
						Remove
					</StyledRemoveButton>
				</StyledIngredientContainer>
			))}
			<div>
				<StyledInput
					type="text"
					placeholder="Add ingredient..."
					value={newIngredient}
					onChange={(e) => setNewIngredient(e.target.value)}
				/>
				<StyledButton type="button" onClick={addNewIngredient}>
					Add Ingredient
				</StyledButton>
			</div>
			<StyledSubmitButton type="submit">Get Recipes</StyledSubmitButton>
		</StyledForm>
	);
}

export default Ingredients;
