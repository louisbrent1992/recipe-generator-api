import styled from "styled-components";

const RecipeContainer = styled.div`
	position: relative;
	background-color: #fff;
	border: 1px solid #ccc;
	max-width: 400px;
	margin: 0 auto;
	border-radius: 5px;
	padding: 20px;
	margin-block: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeHeading = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`;

const RecipeIngredients = styled.div`
	font-size: 16px;

	h3 {
		font-size: 18px;
		margin-bottom: 8px;
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

	ol {
		padding-left: 20px;
		margin: 0;
	}

	li {
		margin-bottom: 8px;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	width: 100%;
`;

export {
	RecipeContainer,
	RecipeHeading,
	RecipeIngredients,
	RecipeSteps,
	LoadingContainer,
};
