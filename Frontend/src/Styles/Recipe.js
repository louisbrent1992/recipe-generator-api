import styled from "styled-components";
import { smallMobile } from "../Utilities/mobileResponse";

const RecipeContainer = styled.div`
	position: relative;
	background-color: #fff;
	border: 1px solid #ccc;
	max-width: 400px;
	margin: 0 auto;
	border-radius: 5px;
	padding: 20px;
	${smallMobile({
		maxWidth: "90%",
	})}
	margin-top: 20px;
	margin-bottom: 100px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeHeading = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
	color: red;
`;

const RecipeIngredients = styled.div`
	font-size: 16px;

	h3 {
		font-size: 18px;
		margin-bottom: 10px;
	}

	ul {
		list-style-type: disc;
		padding-left: 20px;
		margin: 0;
	}

	li {
		margin-bottom: 8px;
	}
`;

const RecipeSteps = styled.div`
	font-size: 16px;

	h3 {
		font-size: 18px;
		margin-bottom: 8px;
	}

	li {
		margin-bottom: 8px;
	}
`;

const LoadingContainer = styled.div`
	position: relative;
	width: 66%;
	display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 20px;
	overflow: hidden;
`;

const RecipeImageContainer = styled.div`
	padding-block: 20px;
	max-width: 400px;
	max-height: 400px;
`;

const RecipeImage = styled.img`
	cursor: pointer;
	max-width: 100%; /* Ensure the image doesn't exceed its container */
	height: auto; /* Maintain aspect ratio */
	display: block; /* Remove any default inline spacing */
	margin: 0 auto; /* Center the image horizontally */
	border-radius: 8px; /* Add rounded corners */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

export {
	RecipeContainer,
	RecipeHeading,
	RecipeIngredients,
	RecipeSteps,
	LoadingContainer,
	RecipeImage,
	RecipeImageContainer,
};
