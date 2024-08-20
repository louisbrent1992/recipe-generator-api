import styled from "styled-components";
import { smallMobile } from "../Utilities/mobileResponse";

const Container = styled.div``;

const MainContainer = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const LoginContainer = styled.div`
	margin: 0 auto;
	padding: 20px 40px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 40px;
	${smallMobile({
		maxWidth: "90%",
		flexDirection: "column",
	})}
`;

const Title = styled.h2`
	text-align: center;
	margin-block: 20px;
`;

const EmailPasswordContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const EmailPasswordTitle = styled.h3`
	font-size: 1.2rem;
	margin-bottom: 20px;
	text-align: center;
`;

const FormContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	margin-bottom: 5px;
	font-size: 1rem;
`;

const Input = styled.input`
	padding: 10px;
	margin-bottom: 15px;
	border: 1px solid #ccc;
	border-radius: 3px;
	font-size: 1rem;
`;

const Button = styled.button`
	background-color: #007bff;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	font-size: 1rem;
	margin-bottom: 20px;

	&:hover {
		background-color: #0056b3;
	}
`;

const DividerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledDivider = styled.div`
	flex: 1;
	height: 1px;
	background-color: #ccc;
	margin: 0 10px;
`;

const DividerText = styled.span`
	color: #ccc;
	font-weight: bold;
	font-size: 16px;
`;

// Additional styles for the login container
const StyledLoginContainer = styled(LoginContainer)`
	margin: 0 auto;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
`;

// Additional styles for the login button
const StyledButton = styled(Button)`
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

const GoogleContainer = styled.div`
	display: flex;
	align-items: center;

	flex-direction: column;

	& > button {
		margin: 10px;
	}
`;

// Define additional styled components for the registration page
const AvatarContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AvatarPreview = styled.img`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
	box-shadow: -10px 8px 8px rgba(0, 0, 0, 0.2);
`;

const UploadButton = styled.label`
	display: block;
	color: #007bff;
	cursor: pointer;
	margin-block: 10px;
	text-align: center;
`;

const ErrorMessage = styled.p`
	color: red;
	font-size: 0.8rem;
	margin-block: 10px;
	text-align: center;
`;
const SuccessMessage = styled.p`
	color: green;
	font-size: 0.8rem;
	margin-block: 10px;
	text-align: center;
`;

// Define a new styled component for the disclaimer
const Disclaimer = styled.div`
	margin-top: 10px;
	text-align: center;
	font-size: 14px;
`;

// Style the link within the disclaimer
const RegisterLink = styled.a`
	color: #007bff; /* Blue color for links */
	text-decoration: none; /* Remove underline */
	transition: color 0.2s; /* Smooth color transition on hover */
	margin-left: 5px;

	&:hover {
		color: #0056b3; /* Darker blue color on hover */
	}
`;

const GuestLink = styled(RegisterLink)``;
export {
	Container,
	LoginContainer,
	Title,
	EmailPasswordContainer,
	EmailPasswordTitle,
	Form,
	FormContainer,
	Label,
	Input,
	Button,
	StyledDivider,
	StyledLoginContainer,
	StyledButton,
	GoogleContainer,
	AvatarContainer,
	AvatarPreview,
	UploadButton,
	DividerContainer,
	DividerText,
	ErrorMessage,
	Disclaimer,
	RegisterLink,
	GuestLink,
	SuccessMessage,
	MainContainer,
};
