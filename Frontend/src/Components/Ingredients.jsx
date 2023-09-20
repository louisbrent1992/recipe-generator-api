import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	FormContainer,
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
} from "../Redux/ingredientsSlice";
import { clearRecipe, setRecipe } from "../Redux/recipeSlice";

function Ingredients({ setLoading }) {
	const [newIngredient, setNewIngredient] = useState("");
	const ingredients = useSelector((state) => state.ingredients);

	const dispatch = useDispatch();

	// Inside your handleGetRecipes function
	const handleGetRecipes = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(
				`${process.env.REACT_APP_DATABASE_URI}/api/v1/generate-recipe`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },

					body: JSON.stringify({ ingredients: ingredients }),
				}
			);

			const fetchedRecipe = await res.json();

			if (fetchedRecipe) {
				dispatch(clearRecipe());
				dispatch(setRecipe(fetchedRecipe));
				dispatch(clearIngredients());
			} else {
				// Handle the case where no recipe data is received
				setLoading(false);
				console.error("No recipe data received. Internal server error.");
			}
		} catch (error) {
			// Handle axios request errors here
			setLoading(false);
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
		<FormContainer>
			<StyledForm onSubmit={handleGetRecipes}>
				<StyledHeading>Ingredients</StyledHeading>
				{ingredients?.length === 0 && (
					<p style={{ paddingBottom: "20px" }}>
						Add ingredients to get recipes!
					</p>
				)}
				{ingredients?.map((ingredient) => (
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
		</FormContainer>
	);
}

export default Ingredients;
