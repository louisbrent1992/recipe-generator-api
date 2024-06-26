import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRecipeRegenerate } from "../../Utilities/buttons";

function RegenButton({ setLoading }) {
	const recipe = useSelector((state) => state.recipe); // Updated state selector

	const dispatch = useDispatch();

	let timeInterval;

	const recipeIngredients = recipe.ingredients.map((ingredient) => {
		return {
			name: ingredient.name,
			_id: Math.random().toString(),
		};
	});

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
			style={{ height: "1rem", width: "1rem", cursor: "pointer" }}
			onClick={() =>
				handleRecipeRegenerate(
					dispatch,
					setLoading,
					recipeIngredients,
					timeInterval,
					recipe.feelingLucky
				)
			}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
			/>
		</svg>
	);
}

export default RegenButton;
