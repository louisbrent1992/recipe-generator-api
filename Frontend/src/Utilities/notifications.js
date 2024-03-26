import Swal from "sweetalert2";
import { handleDeleteFav, handleUserDelete } from "./buttons";

export const recipeImagePopup = (image) => {
	Swal.fire({
		background: `center / cover no-repeat url(${image})`,
		padding: "15em",
		imageAlt: "Recipe Image",
		showCloseButton: false,
		showConfirmButton: false,
	});
};

export const avatarImagePopup = (image) => {
	Swal.fire({
		background: `center / cover no-repeat url(${image})`,
		padding: "10em",
		imageAlt: "Profile Pic",
		showCloseButton: true,
	});
};
export const confirmDeleteRecipe = async (recipe, dispatch) => {
	const result = await Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	});
	if (result.isConfirmed) {
		handleDeleteFav(recipe, dispatch);
		Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
	} else {
		Swal.fire("Cancelled", "Your recipe is safe :)", "error");
	}
};

export const confirmDeleteUser = async (currentUser, dispatch, setError) => {
	const result = await Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	});
	if (result.isConfirmed) {
		handleUserDelete(currentUser, dispatch, setError);
		Swal.fire("Deleted!", "user has been deleted.", "success");
	} else {
		Swal.fire("Cancelled", "user is safe :)", "error");
	}
};

export const handleAddIngredient = (e) => {
	e.preventDefault();
	Swal.fire({
		icon: "info", // Use an info icon instead of a warning or error
		title: "Notice", // Use a neutral title
		text: "Please add an ingredient before proceeding.", // Use a gentle reminder message
	});
};
