import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState: [],
	reducers: {
		addIngredient: (state, action) => {
			// Ingredient not in ingredients, add it
			state.push(action.payload);
		},
		removeIngredient: (state, action) => {
			const ingredient = state.find(
				(ingredient) => ingredient._id === action.payload
			);
			if (ingredient) {
				const index = state.findIndex(
					(ingredient) => ingredient._id === action.payload
				);
				state.splice(index, 1);
			}
		},
		clearIngredients: () => [], // Return a new empty array to reset the state
	},
});

export const { addIngredient, removeIngredient, clearIngredients } =
	ingredientsSlice.actions;
export default ingredientsSlice.reducer;
