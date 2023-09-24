import Swal from "sweetalert2";
import {
	addIngredient,
	clearIngredients,
	removeIngredient,
} from "../Redux/ingredientsSlice";
import { clearRecipe, setRecipe } from "../Redux/recipeSlice";
import { BASE_URL } from "./requests";
import { handleRecipeGenerate } from "./buttons";

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
	dispatch,
	timerInterval
) => {
	event.preventDefault();
	Swal.fire({
		icon: "info",
		title: "Generating recipe",
		html: "Please allow up to <duration></duration> seconds for recipe to generate.",
		timer: 40000,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading();
			const duration = Swal.getHtmlContainer().querySelector("duration");
			timerInterval = setInterval(() => {
				duration.textContent = Swal.getTimerLeft();
			}, 1000);
		},
		willClose: () => {
			clearInterval(timerInterval);
		},
	});
	setLoading(true);

	try {
		const response = await fetch(`${BASE_URL}/api/v1/generate-recipe`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ingredients }),
		});

		const fetchedRecipe = await response.json();

		if (fetchedRecipe) {
			Swal.fire({
				title: "Sweet! Here's your recipe!",
				text: fetchedRecipe.name,
				imageUrl: fetchedRecipe.img,
				imageWidth: 400,
				imageHeight: 400,
				imageAlt: "Recipe Image",
				confirmButtonColor: "#4caf50",
				confirmButtonText: "Regenerate Recipe",
				showCloseButton: true,
			}).then((result) => {
				if (result.isConfirmed) {
					handleRecipeGenerate(dispatch, setLoading, ingredients);
				}
			});
			dispatch(clearRecipe());
			dispatch(setRecipe(fetchedRecipe));
			dispatch(clearIngredients());
			setLoading(false);
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Recipe data not received. Please try again later.",
			});
			setLoading(false);
			console.error("No recipe data received. Internal server error.");
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "Error retrieving recipe. Please try again later.",
		});
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
