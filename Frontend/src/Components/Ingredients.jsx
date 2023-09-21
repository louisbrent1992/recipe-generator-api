import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	FormContainer,
	StyledButton,
	StyledForm,
	StyledHeading,
	StyledIngredientContainer,
	StyledInput,
	StyledRemoveButton,
	StyledSubmitButton,
} from "../Styles/Ingredients";

import { addIngredient } from "../Redux/ingredientsSlice";

import {
	addNewIngredient,
	handleGetRecipes,
	removeIngredientHandler,
} from "../Utilities/ingredients";

function Ingredients({ setLoading }) {
	const [newIngredient, setNewIngredient] = useState("");
	const ingredients = useSelector((state) => state.ingredients);

	const dispatch = useDispatch();

	return (
		<FormContainer>
			<StyledForm
				onSubmit={(e) => handleGetRecipes(e, setLoading, ingredients, dispatch)}
			>
				<StyledHeading>Ingredients</StyledHeading>
				{ingredients?.length === 0 && (
					<p style={{ paddingBottom: "20px" }}>
						Add ingredients to get recipes!
					</p>
				)}
				{ingredients?.map((ingredient) => (
					<StyledIngredientContainer key={ingredient._id}>
						<StyledInput
							type="text"
							name={`ingredient-${ingredient._id}`}
							value={ingredient.name}
							onChange={(e) => {
								const updatedIngredient = {
									...ingredient,
									name: e.target.value,
								};
								dispatch(addIngredient(updatedIngredient));
							}}
						/>
						<StyledRemoveButton
							type="button"
							onClick={() => {
								removeIngredientHandler(ingredient._id, dispatch);
							}}
						>
							Remove
						</StyledRemoveButton>
					</StyledIngredientContainer>
				))}
				<div>
					<StyledInput
						type="text"
						placeholder="Add ingredient..."
						value={newIngredient}
						onChange={(e) => setNewIngredient(e.target.value)}
					/>
					<StyledButton
						type="button"
						onClick={() => addNewIngredient(
							newIngredient,
							dispatch,
							setNewIngredient
						)}
					>
						Add Ingredient
					</StyledButton>
				</div>
				<StyledSubmitButton type="submit">Get Recipes</StyledSubmitButton>
			</StyledForm>
		</FormContainer>
	);
}

export default Ingredients;
