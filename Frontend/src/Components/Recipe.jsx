import React, { useRef } from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import {
	LoadingContainer,
	RecipeContainer,
	RecipeHeading,
	RecipeImage,
	RecipeImageContainer,
	RecipeIngredients,
	RecipeSteps,
} from "../Styles/Recipe";
import { PacmanLoader } from "react-spinners";
import RecipeButtons from "./Buttons/RecipeButtons";
import { recipeImagePopup } from "../Utilities/notifications";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function Recipe({ loading, setLoading }) {
	const recipe = useSelector((state) => state.recipe); // Updated state selector

	// Create a ref for the recipe container
	const recipeContainerRef = useRef(null);

	if (loading) {
		// Display a loading spinner while waiting for data
		return (
			<LoadingContainer>
				<PacmanLoader
					css={override}
					size={25}
					color={"#4caf50"}
					loading={loading}
				/>
			</LoadingContainer>
		);
	}

	if (!recipe.ingredients) {
		// No recipe available
		return (
			<RecipeContainer>
				<p>No recipe available.</p>
			</RecipeContainer>
		);
	}

	return (
		<RecipeContainer ref={recipeContainerRef}>
			<RecipeImageContainer>
				<RecipeImage
					src={recipe.img}
					alt={recipe.name}
					title={recipe.name}
					onClick={() => recipeImagePopup(recipe.img)}
				/>
			</RecipeImageContainer>
			<RecipeHeading>{recipe.name}</RecipeHeading>
			<RecipeButtons
				recipeContainerRef={recipeContainerRef}
				setLoading={setLoading}
			/>
			<RecipeIngredients>
				<h3>Ingredients:</h3>
				{Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
					<ul key={recipe._id} style={{ marginLeft: "40px", padding: 0 }}>
						{recipe.ingredients.map((ingredient) => (
							<li key={ingredient.name}>
								{ingredient.quantity} {ingredient.unit} {ingredient.name}
							</li>
						))}
					</ul>
				)}

				{recipe.additionalIngredients && <h3>Additional Ingredients:</h3>}
				{Array.isArray(recipe.additionalIngredients) &&
					recipe.additionalIngredients.length > 0 && (
						<ul key={recipe._id} style={{ marginLeft: "40px", padding: 0 }}>
							{recipe.additionalIngredients.map((ingredient) => (
								<li key={ingredient.name}>
									{ingredient.quantity} {ingredient.unit} {ingredient.name}
								</li>
							))}
						</ul>
					)}
			</RecipeIngredients>

			<RecipeSteps>
				<h3>Steps:</h3>
				{Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
					<ol key={recipe._id} style={{ marginLeft: "40px", padding: 0 }}>
						{recipe.steps.map((step) => (
							<li key={step}>{step}</li>
						))}
					</ol>
				)}
			</RecipeSteps>
		</RecipeContainer>
	);
}

export default Recipe;
