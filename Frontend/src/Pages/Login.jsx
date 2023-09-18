import React, { useState } from "react";
import {
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
} from "../Styles/Login";
import GoogleLoginButton from "../Components/Buttons/GoogleLoginButton";
import { useDispatch } from "react-redux";
import { clearUser, updateUser } from "../Redux/userSlice";

function Login() {
	const [error, setError] = useState(""); // Error message from the server, if any
	const [message, setMessage] = useState(""); // Success message from the server, if any

	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const loginData = {
			email: data.get("email"),
			password: data.get("password"),
		};

		try {
			const response = await fetch("http://localhost:5050/api/v1/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});

			if (response.status === 200) {
				// Login successful
				const loginResponse = await response.json();
				console.log("Login response:", loginResponse);
				dispatch(clearUser());
				dispatch(updateUser(loginResponse.user));
				setMessage("Login successful. Redirecting to dashboard.");
				setTimeout(() => {
					window.location.href = `/dashboard/${loginResponse.user._id}`;
				}, 2000);
			} else if (response.status === 401) {
				// Unauthorized (Invalid credentials)
				alert("Login failed. Please check your credentials.");
				setError("Invalid credentials");
			} else {
				// Other error (e.g., server error)
				alert("Login failed. An error occurred.");
				setError(response.error);
			}
		} catch (error) {
			console.error("Error while logging in:", error);
			alert("Login failed. An error occurred.");
			setError(error);
		}
	};

	return (
		<Container>
			<StyledLoginContainer>
				<StyledTitle>Login</StyledTitle>
				<EmailPasswordContainer onSubmit={handleSubmit}>
					<EmailPasswordTitle>Email/Password Login</EmailPasswordTitle>
					<Form>
						<Label htmlFor="email">Email:</Label>
						<Input type="email" id="email" name="email" required />
						<Label htmlFor="password">Password:</Label>
						<Input type="password" id="password" name="password" required />
						<StyledButton type="submit">Login</StyledButton>
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
					<GoogleLoginButton setError={setError} />
				</GoogleContainer>
				<Disclaimer>
					<p>
						Don't have an account?
						<RegisterLink href="/register">Sign up today.</RegisterLink>
					</p>
				</Disclaimer>
			</StyledLoginContainer>
		</Container>
	);
}

export default Login;
