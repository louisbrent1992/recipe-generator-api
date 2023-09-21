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
import { useDispatch, useSelector } from "react-redux";
import { NavbarBrand } from "../Styles/Navbar";
import { handleLogin } from "../Utilities/auth";

function Login() {
	const [error, setError] = useState(""); // Error message from the server, if any
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
			<StyledLoginContainer>
				<StyledTitle>Login</StyledTitle>
				<EmailPasswordContainer
					onSubmit={(e) => handleLogin(e, dispatch, setMessage, setError)}
				>
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
