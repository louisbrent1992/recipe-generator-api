import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
	name: "recipe",
	initialState: {
		recipe: null, // Change to a single recipe object
	},
	reducers: {
		setRecipe: (state, action) => {
			// Set the recipe to the payload object
			state.recipe = action.payload;
		},
		clearRecipe: (state) => {
			// Clear the recipe
			state.recipe = null;
		},
	},
});

export const { setRecipe, clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
