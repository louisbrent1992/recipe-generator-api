import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../Redux/userSlice";

// users save their favorite recipes for later reference

function FavButton() {
	const dispatch = useDispatch();
	const recipe = useSelector((state) => state.recipe);
	const user = useSelector((state) => state.user);

	const handleAddFav = () => {
		user._id
			? dispatch(addFavorite(recipe))
			: alert("Please log in to save recipes");
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			onClick={handleAddFav}
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
			style={{ fill: "red", height: "1rem", width: "1rem", cursor: "pointer" }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
			/>
		</svg>
	);
}

export default FavButton;
