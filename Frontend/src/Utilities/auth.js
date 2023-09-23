import { clearUser, updateUser } from "../Redux/userSlice";
import { BASE_URL } from "./requests";

/**
 * Handles the login process.
 * @param {Event} event - The event object representing the form submission.
 * @param {Function} dispatch - A function used to dispatch actions to the Redux store.
 * @param {Function} setMessage - A function used to set a success message.
 * @param {Function} setError - A function used to set an error message.
 * @returns {Promise<void>}
 */
export const handleLogin = async (event, dispatch, setMessage, setError) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const loginData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	try {
		const response = await fetch(`${BASE_URL}/api/v1/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});

		if (response.ok) {
			const loginResponse = await response.json();
			console.log("Login response:", loginResponse);

			dispatch(clearUser());
			dispatch(updateUser(loginResponse.user));

			setMessage("Login successful. Redirecting to dashboard.");
			setTimeout(() => {
				window.location.href = `/dashboard/${loginResponse.user._id}`;
			}, 2000);
		} else if (response.status === 401) {
			alert("Login failed. Please check your credentials.");
			setError("Invalid credentials");
		} else {
			const errorResponse = await response.json();
			alert("Login failed. An error occurred.");
			setError(errorResponse.error);
		}
	} catch (error) {
		console.error("Error while logging in:", error);
		alert("Login failed. An error occurred.");
		setError(error);
	}
};

/**
 * Handles the registration process for a user.
 * Sends a POST request to the server with the user's registration data, including an optional avatar image.
 * If the registration is successful, it updates the user's information, displays a success message, and redirects the user to the dashboard.
 * If the registration fails, it displays an error message.
 *
 * @param {Event} event - The event object representing the form submission.
 * @param {File} avatarImage - The selected avatar image, if any.
 * @param {Function} setMessage - A function to set the success message.
 * @param {Function} dispatch - A function to dispatch an action to update the user's information.
 * @param {Function} setError - A function to set the error message.
 * @returns {Promise<void>}
 */
export const handleRegister = async (
	event,
	avatarImage,
	setMessage,
	dispatch,
	setError
) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const registrationData = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	if (avatarImage) {
		formData.append("avatar", avatarImage);
	}

	try {
		const response = await fetch(`${BASE_URL}/api/v1/register`, {
			method: "POST",
			body: avatarImage ? formData : JSON.stringify(registrationData),
			headers: {
				"Content-Type": avatarImage
					? "multipart/form-data"
					: "application/json",
			},
		});

		if (response.status === 201) {
			const responseData = await response.json();
			setMessage("Registration successful. Redirecting to dashboard.");
			dispatch(updateUser(responseData.user));
			setTimeout(() => {
				window.location.href = `/dashboard/${responseData.user._id}`;
			}, 2000);
		} else {
			const responseData = await response.json();
			setError(responseData.error);
		}
	} catch (error) {
		console.error("Registration failed:", error);
		setError("Registration failed. Please try again later.");
	}
};
