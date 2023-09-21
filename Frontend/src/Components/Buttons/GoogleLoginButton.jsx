import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/userSlice";
import { BASE_URL } from "../../Utilities/requests";

function GoogleLoginButton({ setError }) {
	const dispatch = useDispatch();
	const handleGoogleLogin = async (googleResponse) => {
		if (googleResponse.error) {
			console.log("Google login failed");
			return;
		}

		// Send the Google access token to your server for verification
		try {
			const response = await fetch(`${BASE_URL}/api/v1/google-login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					googleAccessToken: googleResponse.credential,
				}),
			});

			const data = await response.json();

			if (response.status === 200) {
				dispatch(updateUser(data.user));
				console.log("Google login successful");
				console.log("User data:", data);
				setTimeout(() => {
					window.location.href = `/dashboard/${data.user._id}`;
				}, 2000);
				// You can handle user data and authentication here, such as storing the token in local storage.
			} else {
				console.log("Google login failed");
				setError(data.error);
			}
		} catch (error) {
			console.error("Error while verifying Google token:", error);
		}
	};

	return (
		<GoogleLogin
			onSuccess={handleGoogleLogin}
			onError={() => {
				console.log("Google login failed");
			}}
		/>
	);
}

export default GoogleLoginButton;
