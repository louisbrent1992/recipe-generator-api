import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
	name: "recipe",
	initialState: {
		_id: Math.random().toString(),
		name: "Mystical Midnight Spaghetti",
		img: "https://res.cloudinary.com/client-images/image/upload/c_pad,b_gen_fill,w_500,h_500/v1725590303/louisb._studio_light_photorealistic_hyperrealistic_image_of_M_6dea1eb3-d458-481c-853f-584856f53e44_0_f3xsvx.png",
		ingredients: [
			{ name: "Enchanted Spaghetti", quantity: "200", unit: "grams" },
			{ name: "Moonlit Garlic", quantity: "3", unit: "cloves" },
			{ name: "Starry Olive Oil", quantity: "2", unit: "tbsp" },
			{ name: "Pixie Dust Parmesan", quantity: "1/2", unit: "cup" },
			{
				name: "Basil Leaves from the Secret Garden",
				quantity: "5",
				unit: "leaves",
			},
		],
		additionalIngredients: [
			{ name: "Magical Mushrooms", quantity: "100", unit: "grams" },
			{ name: "Sizzling Sun-Dried Tomatoes", quantity: "50", unit: "grams" },
		],
		steps: [
			"Under the moonlight, bring a cauldron of salted water to a boil.",
			"Add the enchanted spaghetti and cook until al dente, stirring with a wand.",
			"In a separate pan, heat the starry olive oil and sauté the moonlit garlic until fragrant, but not burned by the sun.",
			"Mix in the magical mushrooms and sun-dried tomatoes, adding an extra dash of pixie dust for flavor.",
			"Drain the spaghetti and combine with the magical mixture, sprinkling generously with pixie dust parmesan and basil from the secret garden.",
			"Serve under the stars, and watch as your guests are enchanted by every bite!",
		],
	},
	reducers: {
		setRecipe: (state, action) => action.payload,
		resetRecipe: (state) => ({
			_id: "",
			name: "",
			img: "",
			ingredients: [],
			additionalIngredients: [],
			steps: [],
		}),
	},
});

export const { setRecipe, resetRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
