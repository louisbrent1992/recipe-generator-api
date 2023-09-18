import React, { useState } from "react";
import {
	AvatarContainer,
	AvatarPreview,
	Container,
	Disclaimer,
	DividerContainer,
	DividerText,
	EmailPasswordContainer,
	EmailPasswordTitle,
	ErrorMessage,
	Form,
	GoogleContainer,
	Input,
	Label,
	RegisterLink,
	StyledButton,
	StyledDivider,
	StyledLoginContainer,
	StyledTitle,
	SuccessMessage,
	UploadButton,
} from "../Styles/Register"; // Reuse styling from the login page
import GoogleSignUp from "../Components/Buttons/GoogleSignUp";
import { useDispatch } from "react-redux";
import { updateUser } from "../Redux/userSlice";

function Register() {
	// State to manage the selected avatar image
	const [avatarImage, setAvatarImage] = useState(null);
	const [error, setError] = useState("");
	const [message, setMessage] = useState(""); // Success message from the server, if any
	const dispatch = useDispatch();

	// Handle avatar upload
	const handleAvatarUpload = (event) => {
		const selectedImage = event.target.files[0];
		if (selectedImage) {
			// Set the selected image in the state
			setAvatarImage(selectedImage);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const registrationData = {
			name: data.get("name"),
			email: data.get("email"),
			password: data.get("password"),
		};

		// Check if an avatar image is selected and append it to the FormData

		// Create a new FormData object for the registration data and append the compressed image
		const formData = new FormData();
		formData.append("name", registrationData.name);
		formData.append("email", registrationData.email);
		formData.append("password", registrationData.password);
		formData.append("avatar", avatarImage); // Append the image directly

		try {
			const response = await fetch("http://localhost:5050/api/v1/register", {
				method: "POST",
				body: avatarImage ? formData : registrationData, // Send the FormData object with the image
			});

			const responseData = await response.json();

			if (response.status === 201) {
				// Registration successful, you can show a success message or redirect to login
				console.log("Registration successful");
				setMessage("Registration successful. Redirecting to dashboard.");
				dispatch(updateUser(responseData.user));
				// Redirect to the login page or perform other actions after registration
				setTimeout(() => {
					window.location.href = `/dashboard/${responseData.user._id}`; // Redirect to the dashboard}}`;
				}, 2000);
			} else {
				alert("Registration failed.");
				// Display the server-side error message
				const responseData = await response.json();
				setError(responseData.error);
			}
		} catch (error) {
			console.error("Error while registering:", error);
			alert("Registration failed. An error occurred.");
		}
	};

	return (
		<Container>
			<StyledLoginContainer>
				<StyledTitle>Register</StyledTitle>
				<AvatarContainer>
					<AvatarPreview
						src={
							avatarImage
								? URL.createObjectURL(avatarImage) // Display the selected image
								: "https://res.cloudinary.com/client-images/image/upload/v1694458634/profile_pic_placeholder_nh4oxn.jpg"
						}
						alt="Avatar Preview"
					/>

					<input
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={handleAvatarUpload}
						id="avatar-upload"
						name="avatar" // Name attribute to match the server-side field name
					/>
					<UploadButton htmlFor="avatar-upload">Upload Avatar</UploadButton>
				</AvatarContainer>
				<EmailPasswordContainer onSubmit={handleSubmit}>
					<EmailPasswordTitle>Registration Information</EmailPasswordTitle>
					<Form>
						<Label htmlFor="name">Name:</Label>
						<Input type="text" id="name" name="name" required />
						<Label htmlFor="email">Email:</Label>
						<Input type="email" id="email" name="email" required />
						<Label htmlFor="password">Password:</Label>
						<Input type="password" id="password" name="password" required />
						<StyledButton type="submit">Register</StyledButton>
					</Form>
				</EmailPasswordContainer>
				<DividerContainer>
					<StyledDivider />
					<DividerText>OR</DividerText>
					<StyledDivider />
				</DividerContainer>
				{error ? (
					<ErrorMessage>{error}</ErrorMessage>
				) : (
					<SuccessMessage>{message}</SuccessMessage>
				)}
				<GoogleContainer>
					<GoogleSignUp setError={setError} />
				</GoogleContainer>
				<Disclaimer>
					<p>
						Have an account already?
						<RegisterLink href="/login">Sign-in.</RegisterLink>
					</p>
				</Disclaimer>
			</StyledLoginContainer>
		</Container>
	);
}

export default Register;
