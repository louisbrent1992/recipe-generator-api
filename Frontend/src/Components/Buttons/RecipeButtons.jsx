import React from "react";
import CopyButton from "./CopyButton";
import FavButton from "./FavButton";
import RegenButton from "./RegenButton";
import { styled } from "styled-components";

const Container = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	gap: 0.3rem;
	justify-content: space-between;
	align-items: center;
	margin: 0.5rem;
`;

function RecipeButtons({ recipeContainerRef, setLoading }) {
	return (
		<Container>
			<RegenButton setLoading={setLoading} />
			<FavButton />
			<CopyButton recipeContainerRef={recipeContainerRef} />
		</Container>
	);
}

export default RecipeButtons;
