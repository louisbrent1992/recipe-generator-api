import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { recipeImagePopup } from "../Utilities/notifications";
import { smallMobile } from "../Utilities/mobileResponse";

// Styled components for the favorites page
const FavoritesPageContainer = styled.div`
	padding-bottom: 60px;
`;

const RecipeCard = styled.div`
	position: relative;
	border: 1px solid #ccc;
	padding: 20px;
	${smallMobile({ display: "flex-wrap", maxWidth: "90%" })}
	margin: 20px;
	background-color: #fff;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
`;

const RecipeTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
	max-width: 50%;
	${smallMobile({ maxWidth: "100%" })}
`;
const RecipeSubtitle = styled.h3`
	margin-block: 10px;
`;

const RecipeIngredients = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	font-size: 16px;
	margin-bottom: 20px;

	li::before {
		content: "• ";
		color: #4caf50; /* Green bullet point color */
	}
`;

const RecipeSteps = styled.ol`
	padding: 0;
	margin: 0;
	font-size: 16px;
	max-width: 60%;

	${smallMobile({ maxWidth: "100%" })}

	li {
		margin-bottom: 10px;
	}
`;

const RecipeImageContainer = styled.div`
	${smallMobile({ position: "relative" })}
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 8px;
	margin-right: 20px;
	margin-bottom: 20px;
	padding-block: 20px;
	max-width: 250px;
	max-height: 250px;
`;

const RecipeImage = styled.img`
	max-width: 100%; /* Ensure the image doesn't exceed its container */
	height: auto; /* Maintain aspect ratio */
	display: block; /* Remove any default inline spacing */
	margin: 0 auto; /* Center the image horizontally */
	border-radius: 8px; /* Add rounded corners */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

function Favorites() {
	// Use useSelector to get the user's saved recipes from the Redux store
	const savedRecipes = useSelector((state) => state.user.savedRecipes);

	return (
		<FavoritesPageContainer>
			<Navbar />
			<h1 style={{ padding: "20px", marginTop: "100px" }}>
				Your Favorite Recipes
			</h1>
			{savedRecipes.length === 0 ? (
				<p>No favorite recipes saved yet.</p>
			) : (
				<div>
					{savedRecipes.map((recipe) => (
						<RecipeCard key={recipe._id}>
							<RecipeTitle>{recipe.name}</RecipeTitle>
							<RecipeImageContainer>
								<RecipeImage
									src={recipe.img}
									onClick={() => recipeImagePopup(recipe.img)}
								/>
							</RecipeImageContainer>
							<RecipeIngredients>
								<RecipeSubtitle>Ingredients:</RecipeSubtitle>
								{recipe.ingredients.map((ingredient) => (
									<li key={ingredient.name}>
										{ingredient.quantity} {ingredient.unit} {ingredient.name}
									</li>
								))}
							</RecipeIngredients>
							<RecipeSteps>
								<RecipeSubtitle>Steps:</RecipeSubtitle>
								{recipe.steps.map((step, index) => (
									<li style={{ marginLeft: "2rem" }} key={recipe.steps[index]}>
										{step}
									</li>
								))}
							</RecipeSteps>
						</RecipeCard>
					))}
				</div>
			)}
			<Footer />
		</FavoritesPageContainer>
	);
}

export default Favorites;
