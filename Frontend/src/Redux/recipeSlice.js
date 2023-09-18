import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
	name: "recipe",
	initialState: {
		name: "",
		img: "",
		ingredients: [],
		additionalIngredients: [],
		steps: [],
	},
	reducers: {
		setRecipe: (state, action) => action.payload,
		clearRecipe: (state) => {
			// Clear the recipe
			return {
				name: "",
				img: "",
				ingredients: [],
				additionalIngredients: [],
				steps: [],
			};
		},
	},
});

export const { setRecipe, clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
