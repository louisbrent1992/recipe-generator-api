import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState: {
		ingredients: [],
	},
	reducers: {
		addIngredient: (state, action) => {
			// Ingredient not in ingredients, add it
			state.ingredients.push(action.payload);
		},
		removeIngredient: (state, action) => {
			const ingredient = state.ingredients.find(
				(ingredient) => ingredient._id === action.payload
			);
			if (ingredient) {
				const index = state.ingredients.findIndex(
					(ingredient) => ingredient._id === action.payload
				);
				state.ingredients.splice(index, 1);
			}
		},
		clearIngredients: (state) => {
			state.ingredients = [];
		},
	},
});

export const { addIngredient, removeIngredient, clearIngredients } =
	ingredientsSlice.actions;
export default ingredientsSlice.reducer;
