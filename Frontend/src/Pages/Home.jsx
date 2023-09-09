import React, { useState } from "react";
import Ingredients from "../Components/Ingredients";
import Recipe from "../Components/Recipe";

function Home() {
	const [loading, setLoading] = useState(false);
	return (
		<div>
			<Ingredients setLoading={setLoading} />
			<Recipe loading={loading} setLoading={setLoading} />
		</div>
	);
}

export default Home;
