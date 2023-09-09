import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import {
	RecipeContainer,
	RecipeHeading,
	RecipeIngredients,
	RecipeSteps,
} from "../Styles/Recipe";
import { ClipLoader } from "react-spinners";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function Recipe({ loading, setLoading }) {
	const recipe = useSelector((state) => state.recipe.recipe.recipe); // Updated state selector

	useEffect(() => {
		if (recipe) {
			setLoading(false);
		}
	}, [recipe, setLoading]);

	if (loading) {
		// Display a loading spinner while waiting for data
		return (
			<div className="loading-container">
				<ClipLoader
					css={override}
					size={50}
					color={"#123abc"}
					loading={loading}
				/>
			</div>
		);
	}

	if (!recipe) {
		// No recipe available
		return <p>No recipe available.</p>;
	}

	return (
		<RecipeContainer key={recipe.name}>
			<RecipeHeading>{recipe.name}</RecipeHeading>
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
