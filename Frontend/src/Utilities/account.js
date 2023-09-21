import { updateUser } from "../Redux/userSlice";
import { BASE_URL } from "./requests";

/**
 * Handles the form submission and updates the user information.
 * @param {Event} event - The event object representing the form submission.
 * @param {Function} setIsEditing - A function to set the editing state of the form.
 * @param {Object} user - An object containing the user's name and email.
 * @param {File} avatar - The avatar image file.
 * @param {Object} currentUser - An object representing the current user.
 * @param {Function} dispatch - A function to dispatch actions to the Redux store.
 * @param {Function} setAvatar - A function to set the avatar image.
 */
export const handleAccountUpdate = async (
	event,
	setIsEditing,
	user,
	avatar,
	currentUser,
	dispatch,
	setAvatar
) => {
	event.preventDefault();
	setIsEditing(false);

	const formData = new FormData();
	formData.append("name", user.name);
	formData.append("email", user.email);

	if (avatar) {
		formData.append("avatar", avatar);
	}

	try {
		const response = await fetch(
			`${BASE_URL}/api/v1/user/avatar_upload/${currentUser._id}`,
			{
				method: "PUT",
				body: formData,
			}
		);

		if (response.ok) {
			const updatedUser = await response.json();
			dispatch(updateUser(updatedUser));
			setAvatar(updatedUser.avatar);
			setIsEditing(false);
			alert("User information updated successfully.");
		} else {
			console.error("Error updating user information:", response.statusText);
			setIsEditing(false);
			alert("Error updating user information. Please try again later.");
		}
	} catch (err) {
		console.error(err);
		setIsEditing(false);
		alert("Error updating user information. Please try again later.");
	}
};

/**
 * Updates the user state by spreading the existing user object and updating the property specified by the `name` attribute of the input element with the new value.
 * @param {Event} e - The event object triggered by the input element.
 * @param {Function} setUser - A function to update the user state.
 * @param {Object} user - The current user state.
 */
export const handleInputChange = (e, setUser, user) => {
	const { name, value } = e.target;
	setUser({ ...user, [name]: value });
};
