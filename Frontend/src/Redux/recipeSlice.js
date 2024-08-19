import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
	name: "recipe",
	initialState: {
		name: "",
		img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvb2R8ZW58MHx8fHwxNjAwNjkzNTQ1&ixlib=rb-1.2.1&q=80&w=400",
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
