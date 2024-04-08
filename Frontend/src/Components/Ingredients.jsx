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
import { handleAddIngredient } from "../Utilities/notifications";

function Ingredients({ setLoading }) {
	const [newIngredient, setNewIngredient] = useState("");
	const ingredients = useSelector((state) => state.ingredients);

	const dispatch = useDispatch();

	let timeInterval;

	return (
		<FormContainer>
			<StyledForm
				onSubmit={(e) =>
					ingredients.length > 0
						? handleGetRecipes(
								e,
								setLoading,
								ingredients,
								dispatch,
								timeInterval,
								false
						  )
						: handleAddIngredient(e)
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
					<StyledAddButton
						type="button"
						onClick={() =>
							addNewIngredient(newIngredient, dispatch, setNewIngredient)
						}
					>
						Add
					</StyledAddButton>
				</StyledIngredientContainer>

				<ButtonsContainer>
					<StyledSubmitButton type="submit">Get Recipe</StyledSubmitButton>
					<StyledSubmitButton
						type="button"
						style={{ backgroundColor: "#007BFF" }}
						onClick={(e) => {
							handleGetRecipes(
								e,
								setLoading,
								ingredients,
								dispatch,
								timeInterval,
								true
							);
						}}
					>
						I'm Feeling Lucky
					</StyledSubmitButton>
				</ButtonsContainer>
			</StyledForm>
		</FormContainer>
	);
}

export default Ingredients;
