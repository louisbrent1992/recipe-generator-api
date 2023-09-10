import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import {
	LoadingContainer,
	RecipeContainer,
	RecipeHeading,
	RecipeIngredients,
	RecipeSteps,
} from "../Styles/Recipe";
import { ClipLoader } from "react-spinners";
import RecipeButtons from "./Buttons/RecipeButtons";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function Recipe({ loading, setLoading }) {
	const recipe = useSelector((state) => state.recipe.recipe.recipe); // Updated state selector

	// Create a ref for the recipe container
	const recipeContainerRef = useRef(null);

	useEffect(() => {
		if (recipe) {
			setLoading(false);
		}
	}, [recipe, setLoading]);

	if (loading) {
		// Display a loading spinner while waiting for data
		return (
			<LoadingContainer>
				<ClipLoader
					css={override}
					size={50}
					color={"#123abc"}
					loading={loading}
				/>
			</LoadingContainer>
		);
	}

	if (!recipe) {
		// No recipe available
		return <p>No recipe available.</p>;
	}

	return (
		<RecipeContainer ref={recipeContainerRef} key={recipe.name}>
			<RecipeHeading>{recipe.name}</RecipeHeading>
			<RecipeButtons
				recipeContainerRef={recipeContainerRef}
				setLoading={setLoading}
			/>
			<RecipeIngredients>
				<h3>Ingredients:</h3>
				{Array.isArray(recipe.ingredients) && (
					<ul>
						{recipe.ingredients.map((ingredient) => (
							<li key={ingredient._id}>{ingredient.name}</li>
						))}
					</ul>
				)}
				<h3>Additional Ingredients:</h3>
				{Array.isArray(recipe.additionalIngredients) && (
					<ul>
						{recipe.additionalIngredients.map((ingredient) => (
							<li key={ingredient._id}>{ingredient.name}</li>
						))}
					</ul>
				)}
			</RecipeIngredients>
			<RecipeSteps>
				<h3>Steps:</h3>
				{Array.isArray(recipe.steps) && (
					<ol>
						{recipe.steps.map((step, index) => (
							<li key={recipe[index]}>{step}</li>
						))}
					</ol>
				)}
			</RecipeSteps>
		</RecipeContainer>
	);
}

export default Recipe;
