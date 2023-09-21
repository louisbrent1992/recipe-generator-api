import {
	addIngredient,
	clearIngredients,
	removeIngredient,
} from "../Redux/ingredientsSlice";
import { clearRecipe, setRecipe } from "../Redux/recipeSlice";
import { BASE_URL } from "./requests";

/**
 * Fetches recipe data from the server and updates the Redux store.
 * @param {Event} event - The event object that triggered the function.
 * @param {Function} setLoading - A function to set the loading state of the component.
 * @param {Array} ingredients - An array of ingredients to be used for generating the recipe.
 * @param {Function} dispatch - A function to dispatch actions to the Redux store.
 * @returns {Promise<void>}
 */
export const handleGetRecipes = async (
	event,
	setLoading,
	ingredients,
	dispatch
) => {
	event.preventDefault();
	setLoading(true);

	try {
		const response = await fetch(
			`${BASE_URL}/api/v1/generate-recipe`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ingredients }),
			}
		);

		const fetchedRecipe = await response.json();

		if (fetchedRecipe) {
			dispatch(clearRecipe());
			dispatch(setRecipe(fetchedRecipe));
			dispatch(clearIngredients());
		} else {
			setLoading(false);
			console.error("No recipe data received. Internal server error.");
		}
	} catch (error) {
		setLoading(false);
		console.error("Error fetching recipe:", error);
	}
};

/**
 * Adds a new ingredient to a list of ingredients.
 * @param {string} newIngredient - The new ingredient to be added.
 * @param {function} dispatch - A function used to dispatch actions to the Redux store.
 * @param {function} setNewIngredient - A function used to update the state of the newIngredient.
 */
export const addNewIngredient = (newIngredient, dispatch, setNewIngredient) => {
	if (newIngredient.trim() !== "") {
		const ingredientToAdd = {
			_id: Math.random().toString(),
			name: newIngredient.trim(),
		};
		dispatch(addIngredient(ingredientToAdd));
		setNewIngredient("");
	}
};

/**
 * Removes an ingredient from the Redux store.
 *
 * @param {number} ingredientId - The ID of the ingredient to be removed.
 * @param {function} dispatch - A function used to dispatch actions to the Redux store.
 */
export function removeIngredientHandler(ingredientId, dispatch) {
	// Call the removeIngredient action creator from the ingredientsSlice module
	const removeIngredientAction = removeIngredient(ingredientId);

	// Dispatch the removeIngredient action to update the Redux store
	dispatch(removeIngredientAction);
}
