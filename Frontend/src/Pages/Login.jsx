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
	GuestLink,
	StyledButton,
	StyledDivider,
	StyledLoginContainer,
	StyledTitle,
	SuccessMessage,
} from "../Styles/Login";
import GoogleLoginButton from "../Components/Buttons/GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import { NavbarBrand, NavbarLogo } from "../Styles/Navbar";
import { handleLogin } from "../Utilities/auth";

function Login() {
	const [error, setError] = useState(""); // Error message from the server, if any
	const [message, setMessage] = useState(""); // Success message from the server, if any

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	return (
		<Container>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					position: "fixed",
					marginTop: "10px",
					top: "0",
				}}
			>
				<NavbarLogo
					style={{ marginLeft: "10px" }}
					src="https://res.cloudinary.com/client-images/image/upload/v1712867551/Site%20Logos/louisb._recipe_finder_app_logo_png_--style_raw_bf38e6b0-bace-4219-9940-bca52717576c_znasxd.png"
					alt="Logo"
				/>
				<NavbarBrand
					style={{
						color: "#f5f5f5",
						padding: "10px",
					}}
					href={user._id ? `/dashboard/${user._id}` : "/dashboard"}
				>
					Recipe Finder
				</NavbarBrand>
			</div>

			<StyledLoginContainer>
				<StyledTitle>Login:</StyledTitle>
				<EmailPasswordContainer
					onSubmit={(e) => handleLogin(e, dispatch, setMessage, setError)}
				>
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
					<DividerContainer>
						<StyledDivider style={{ marginBlock: "10px", flex: "0.5" }} />
					</DividerContainer>
					<p>
						Continue as<GuestLink href="/">Guest.</GuestLink>
					</p>
				</Disclaimer>
			</StyledLoginContainer>
		</Container>
	);
}

export default Login;
