import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	FormContainer,
	StyledForm,
	StyledHeading,
	StyledIngredientContainer,
	StyledInput,
	StyledAddInput,
	ButtonsContainer,
	StyledAddButton,
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

	let timeInterval;

	return (
		<FormContainer>
			<StyledForm
				onSubmit={(e) =>
					handleGetRecipes(e, setLoading, ingredients, dispatch, timeInterval)
				}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
					}
				}}
			>
				<StyledHeading>List of Ingredients</StyledHeading>
				{ingredients?.length === 0 && (
					<p style={{ paddingBottom: "20px" }}>
						Add ingredients to get recipes!
					</p>
				)}
				<ol>
					{ingredients?.map((ingredient) => (
						<li key={ingredient._id}>
							<StyledIngredientContainer>
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
						</li>
					))}
				</ol>

				<StyledIngredientContainer>
					<StyledAddInput
						type="text"
						placeholder="Add ingredient..."
						value={newIngredient}
						onChange={(e) => setNewIngredient(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" &&
							addNewIngredient(newIngredient, dispatch, setNewIngredient)
						}
					/>
					<StyledAddButton type="button">Add</StyledAddButton>
				</StyledIngredientContainer>

				<ButtonsContainer>
					<StyledSubmitButton type="submit">Get Recipes</StyledSubmitButton>
				</ButtonsContainer>
			</StyledForm>
		</FormContainer>
	);
}

export default Ingredients;
