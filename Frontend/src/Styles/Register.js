import styled from "styled-components";

const Container = styled.div`
	justify-content: center;
	height: 100vh;
	margin-block: 0 auto;
	display: flex;
	flex-direction: column;
`;

const LoginContainer = styled.div`
	min-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
	text-align: center;
	margin-bottom: 10px;
`;

const EmailPasswordContainer = styled.div`
	margin-top: 20px;
`;

const EmailPasswordTitle = styled.h3`
	font-size: 1.2rem;
	margin-bottom: 10px;
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

	&:hover {
		background-color: #0056b3;
	}
`;

const DividerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
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
	max-width: 400px;
	margin: 0 auto;
	margin-top: 150px;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border-radius: 8px;
`;

// Additional styles for the login title
const StyledTitle = styled(Title)`
	font-size: 24px;
	text-align: center;
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
	justify-content: center;

	& > button {
		margin: 10px;
	}
`;

// Define additional styled components for the registration page
const AvatarContainer = styled.div`
	text-align: center;
`;

const AvatarPreview = styled.img`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
`;

const UploadButton = styled.label`
	display: block;
	text-align: center;
	color: #007bff;
	cursor: pointer;
	margin-block: 10px;
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
export {
	Container,
	LoginContainer,
	Title,
	EmailPasswordContainer,
	EmailPasswordTitle,
	Form,
	Label,
	Input,
	Button,
	StyledDivider,
	StyledLoginContainer,
	StyledTitle,
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
	SuccessMessage,
};
