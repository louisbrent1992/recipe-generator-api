import { clearRecipe, setRecipe } from "../Redux/recipeSlice";
import { addFavorite, clearUser, deleteFavorite } from "../Redux/userSlice";
import { BASE_URL } from "./requests";

/**
 * This function handles the copying of a recipe text to the clipboard and shows a notification to indicate the success or failure of the operation.
 *
 * @param {RefObject<HTMLElement>} recipeContainerRef - A reference to the container element that holds the recipe text.
 */
export const handleCopyRecipe = (recipeContainerRef) => {
	if (recipeContainerRef.current) {
		const recipeText = recipeContainerRef.current.innerText;

		try {
			navigator.clipboard.writeText(recipeText);
			console.log("Recipe copied to clipboard:", recipeText);
		} catch (error) {
			console.error("Error copying recipe:", error);
		}
	} else {
		console.error("Recipe container reference not available.");
	}
};

/**
 * This function handles adding a recipe to favorites. If the user is logged in, it dispatches an action to add the recipe as a favorite. If the user is not logged in, it displays an alert message asking the user to log in.
 * @param {function} dispatch - The dispatch function from Redux.
 * @param {object} user - The user object.
 * @param {object} recipe - The recipe object to be added as a favorite.
 */
export const handleAddFav = (dispatch, user, recipe) => {
	if (user._id) {
		dispatch(addFavorite(recipe));
	} else {
		alert("Please log in to save recipes");
	}
};

/**
 * This code defines a function named handleRegenRecipe that generates a recipe based on a list of ingredients. It uses the fetch function to send a POST request to a specified API endpoint, passing the ingredients as JSON in the request body. The response is then parsed as JSON and if a recipe is received, it dispatches actions to update the recipe state in the Redux store. If no recipe data is received or an error occurs, appropriate error messages are logged.
 * @param {function} dispatch - A function used to dispatch actions to the Redux store.
 * @param {function} setLoading - A function used to set the loading state.
 * @param {array} recipeIngredients - An array of ingredients used to generate the recipe.
 * @returns {Promise<void>}
 */
export const handleRegenRecipe = async (
	dispatch,
	setLoading,
	recipeIngredients
) => {
	setLoading(true);

	console.log(BASE_URL);

	try {
		const response = await fetch(`${BASE_URL}/api/v1/generate-recipe`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ingredients: recipeIngredients }),
		});

		const fetchedRecipe = await response.json();

		if (fetchedRecipe) {
			dispatch(clearRecipe());
			dispatch(setRecipe(fetchedRecipe));
		} else {
			console.error("No recipe data received.");
		}
	} catch (error) {
		console.error("Error fetching recipe:", error);
	}
};

/**
 * Deletes a user account.
 * Sends a DELETE request to the server with the user's ID.
 * If the request is successful, dispatches the `clearUser` action,
 * displays a success message, and redirects the user to the homepage.
 * If there is an error during the deletion process, displays an error message
 * and sets an error state.
 *
 * @param {Object} currentUser - The current user object.
 * @param {Function} dispatch - A function used to dispatch actions to the Redux store.
 * @param {Function} setError - A function used to set an error state.
 * @returns {Promise<void>}
 */
export const handleUserDelete = async (currentUser, dispatch, setError) => {
	try {
		const response = await fetch(
			`${BASE_URL}/api/v1/users/${currentUser._id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.ok) {
			dispatch(clearUser());
			alert("Account deleted successfully.");
			setTimeout(() => {
				window.location.href = "/";
			}, 2000);
		} else {
			throw new Error("Error deleting account. Please try again later.");
		}
	} catch (err) {
		console.error(err);
		setError("Error deleting user account. Please try again later.");
	}
};

/**
 * Handles the cancellation of an edit operation.
 * @param {boolean} isEditing - Indicates whether the user is currently in edit mode or not.
 * @param {function} setIsEditing - Function used to update the state of the `isEditing` variable.
 * @param {function} setUser - Function used to update the state of the `user` variable.
 * @param {function} setAvatar - Function used to update the state of the `avatar` variable.
 * @param {object} defaultUser - The default user object.
 * @param {object} currentUser - The current user object.
 */
export const handleEditCancel = (
	isEditing,
	setIsEditing,
	setUser,
	setAvatar,
	defaultUser,
	currentUser
) => {
	if (isEditing) {
		setUser(defaultUser);
		setAvatar(currentUser.avatar);
		setIsEditing(false);
	}
};

/**
 * Handles the upload of an avatar image.
 * Sets the selected image URL in the state and updates the UI accordingly.
 *
 * @param {Event} event - The event object triggered by the file input change.
 * @param {Function} setIsEditing - A function to set the editing state.
 * @param {Function} setAvatar - A function to set the avatar image URL in the state.
 * @param {Function} setError - A function to set an error message.
 */
export const handleAvatarUpload = (
	event,
	setIsEditing,
	setAvatar,
	setError
) => {
	const selectedImage = event.target.files[0];

	if (selectedImage) {
		const imageUrl = URL.createObjectURL(selectedImage);
		setIsEditing(true);
		setAvatar(imageUrl);
	} else {
		setError("No image selected");
	}
};

/**
 * Toggles the value of `isEditing` between `true` and `false`.
 * If `isEditing` is initially `false`, it sets it to `true`.
 * If `isEditing` is initially `true`, it does nothing.
 *
 * @param {boolean} isEditing - A boolean value indicating whether the user is currently in editing mode.
 * @param {function} setIsEditing - A function that can be used to update the value of `isEditing`.
 */
export const handleEdit = (isEditing, setIsEditing) => {
	if (!isEditing) {
		setIsEditing(true);
	}
};

/**
 * Deletes a favorite recipe from the user's list of favorites.
 * @param {Object} recipe - The recipe object to be deleted.
 * @param {Function} dispatch - The dispatch function from the Redux store.
 */
export const handleDeleteFav = (recipe, dispatch) => {
	if (!recipe) {
		console.log("No recipe specified");
		return;
	}

	dispatch(deleteFavorite(recipe));
	console.log("Recipe deleted from favorites:", recipe.name);
};
