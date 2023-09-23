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
	FormContainer,
	GoogleContainer,
	Input,
	Label,
	MainContainer,
	RegisterLink,
	StyledButton,
	StyledDivider,
	StyledLoginContainer,
	StyledTitle,
	SuccessMessage,
	UploadButton,
} from "../Styles/Register"; // Reuse styling from the login page
import GoogleSignUp from "../Components/Buttons/GoogleSignUp";
import { useDispatch, useSelector } from "react-redux";
import { NavbarBrand } from "../Styles/Navbar";
import { handleRegister } from "../Utilities/auth";
import { handleAvatarUpload } from "../Utilities/buttons";

function Register() {
	// State to manage the selected avatar image
	const [avatarImage, setAvatarImage] = useState(null);
	const [error, setError] = useState("");
	const [message, setMessage] = useState(""); // Success message from the server, if any

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	return (
		<Container>
			<NavbarBrand
				style={{
					color: "black",
					position: "absolute",
					top: "0",
					padding: "20px",
				}}
				href={user._id ? `/dashboard/${user._id}` : "/dashboard"}
			>
				Recipe Finder
			</NavbarBrand>

			<MainContainer>
				<StyledTitle>Register</StyledTitle>
				<StyledLoginContainer>
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
							onChange={(e) => handleAvatarUpload(e, setAvatarImage)}
							id="avatar-upload"
							name="avatar" // Name attribute to match the server-side field name
						/>
						<UploadButton htmlFor="avatar-upload">Upload Avatar</UploadButton>
					</AvatarContainer>
					<FormContainer>
						<EmailPasswordContainer
							onSubmit={(e) =>
								handleRegister(e, avatarImage, setMessage, dispatch, setError)
							}
						>
							<EmailPasswordTitle>Registration Information</EmailPasswordTitle>
							<Form>
								<Label htmlFor="name">Name:</Label>
								<Input
									type="text"
									id="name"
									name="name"
									placeholder="John Doe"
									required
								/>
								<Label htmlFor="email">Email:</Label>
								<Input
									type="email"
									id="email"
									name="email"
									placeholder="username@email.com"
									required
								/>
								<Label htmlFor="password">Password:</Label>
								<Input
									type="password"
									id="password"
									name="password"
									placeholder="minimum 6 characters, case-sensitive, alphanumeric"
									required
								/>
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
					</FormContainer>
				</StyledLoginContainer>
			</MainContainer>
		</Container>
	);
}

export default Register;
