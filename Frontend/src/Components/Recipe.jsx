import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ProgressBar from "./ProgressBar";

const {
	REACT_APP_NODE_ENV,
	REACT_APP_WEBSOCKET_URI_DEV,
	REACT_APP_WEBSOCKET_URI_PROD,
} = process.env;

function Recipe({ loading, setLoading }) {
	const recipe = useSelector((state) => state.recipe);
	const dispatch = useDispatch();
	const recipeContainerRef = useRef(null);
	const [progress, setProgress] = useState(0);
	const [update, setUpdate] = useState("");
	const [ws, setWs] = useState(null); // State to manage WebSocket connection

	// Default image URL
	const defaultImageUrl =
		"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGZvb2R8ZW58MHx8fHwxNjAwNjkzNTQ1&ixlib=rb-1.2.1&q=80&w=400";

	useEffect(() => {
		// Establish WebSocket connection
		const websocket = new WebSocket(
			REACT_APP_NODE_ENV === "production"
				? REACT_APP_WEBSOCKET_URI_PROD
				: REACT_APP_WEBSOCKET_URI_DEV
		);
		setWs(websocket);

		// Listen for messages from the WebSocket server
		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.progress) {
				setUpdate(data.update); // Update progress state
				setProgress(data.progress); // Update progress state
			}
			if (data.recipe) {
				setLoading(false); // Stop loading spinner
			}
		};

		// Cleanup WebSocket connection on component unmount
		return () => {
			websocket.close();
		};
	}, [dispatch, setLoading]);

	if (loading) {
		// Display a loading spinner and progress message while waiting for data
		return (
			<LoadingContainer>
				<PacmanLoader
					size={25}
					color={"#4caf50"}
					loading={loading}
					style={{
						position: "absolute",
						top: "6px",
						left: `${progress - 2}%`,
						transition: "left 0.8s ease",
					}}
				/>
				<ProgressBar progress={progress} update={update} />{" "}
				{/* Display progress updates */}
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
					src={recipe.img || defaultImageUrl}
					alt={recipe.name}
					title={recipe.name}
					onClick={() =>
						recipeImagePopup(
							recipe.img,
							window.innerWidth < 768 ? "8em" : "15em"
						)
					}
					onError={(e) => {
						e.target.onerror = null; // Prevent infinite loop if the fallback also fails
						e.target.src = defaultImageUrl; // Set the fallback image URL
					}}
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
							<li key={ingredient._id}>
								{ingredient.quantity} {ingredient.unit} {ingredient.name}
							</li>
						))}
					</ul>
				)}

				{recipe.additionalIngredients.length > 0 && (
					<h3>Additional Ingredients:</h3>
				)}
				{Array.isArray(recipe.additionalIngredients) &&
					recipe.additionalIngredients.length > 0 && (
						<ul key={recipe._id} style={{ marginLeft: "40px", padding: 0 }}>
							{recipe.additionalIngredients.map((ingredient) => (
								<li key={ingredient._id}>
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
