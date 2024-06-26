import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/userSlice";
import { BASE_URL } from "../../Utilities/requests";

function GoogleSignUp({ setError }) {
	const dispatch = useDispatch();

	const handleGoogleSignup = async (googleResponse) => {
		if (googleResponse.error) {
			console.log("Google sign-up failed");
			return;
		}

		// Send the Google access token to your server for verification
		try {
			const response = await fetch(`${BASE_URL}/api/v1/google-signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					googleAccessToken: googleResponse.credential,
				}),
			});

			const data = await response.json();

			if (response.status === 201) {
				console.log("Google sign-up successful");
				console.log("User data:", data);
				dispatch(updateUser(data.user));
				alert("Sign-up successful");
				setTimeout(() => {
					window.location.href = "/";
				}, 2000);

				// You can handle user data and authentication here, such as storing the token in local storage.
			} else {
				console.log("Google sign-up failed");
				setError(data.error);
			}
		} catch (error) {
			console.error("Error while verifying Google token:", error);
		}
	};

	return (
		<GoogleLogin
			text="signup_with"
			onSuccess={handleGoogleSignup}
			onError={() => {
				console.log("Google Signup failed");
			}}
		/>
	);
}

export default GoogleSignUp;
