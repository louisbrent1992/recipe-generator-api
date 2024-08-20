import styled from "styled-components";

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h1`
	color: #252322;
	margin-top: 100px; /* Increased margin top for better separation */
`;

const InfoSection = styled.section`
	width: 80%;
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #bcbcbc;
	border-radius: 10px;
`;

const InfoTitle = styled.h2`
	color: #252322;
	margin-bottom: 10px;
`;

const InfoText = styled.p`
	color: #666;
	margin-block: 10px;
`;

const EditButton = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: ${(props) => (props.delete ? "#b30000" : "#0066cc")};
	color: #f5f5f5;
	margin-top: 20px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

const ErrorMessage = styled.p`
	color: red;
	margin: 10px 0;
`;

const TextInput = styled.input`
	padding: 10px;
	margin-top: 10px;
	margin-right: 10px;
	border: 1px solid #bcbcbc;
	border-radius: 5px;
	font-size: 1em;
	width: 100%;
	max-width: 500px;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
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

const RecipeCard = styled.li`
	position: relative;
	border: 1px solid #ccc;
	padding: 20px;
	margin-block: 20px;
	background-color: #fff;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
`;

const RecipeTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`;

export {
	PageContainer,
	Title,
	InfoSection,
	InfoTitle,
	InfoText,
	EditButton,
	ErrorMessage,
	TextInput,
	ButtonsContainer,
	AvatarContainer,
	RecipeCard,
	RecipeTitle,
	AvatarPreview,
};
