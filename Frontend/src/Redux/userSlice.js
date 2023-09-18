import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		_id: null,
		name: null,
		email: null,
		avatar: null,
		savedRecipes: null,
	},
	reducers: {
		updateUser: (state, action) => action.payload,
		addFavorite: (state, action) => {
			// Add the favorite to the user's favorites array
			const existingFavorite = state.savedRecipes.find(
				(recipe) => recipe.name === action.payload.name
			);
			if (existingFavorite) {
				alert("This recipe is already in your favorites!");
				return;
			}
			state.savedRecipes.push(action.payload);
			alert("Recipe added to favorites!");
		},
		deleteFavorite: (state, action) => {
			// Delete the favorite from the user's favorites array
			state.savedRecipes = state.savedRecipes.filter(
				(recipe) => recipe.name !== action.payload.name
			);
		},
		clearUser: (state) => {
			// Clear the user
			return {
				_id: null,
				name: null,
				email: null,
				avatar: null,
				savedRecipes: null,
			};
		},
	},
});

export const { updateUser, clearUser, addFavorite, deleteFavorite } =
	userSlice.actions;
export default userSlice.reducer;
