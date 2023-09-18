import React, { useState } from "react";
import Ingredients from "../Components/Ingredients";
import Recipe from "../Components/Recipe";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styled from "styled-components";

const DashboardContainer = styled.div``;

function Home() {
	const [loading, setLoading] = useState(false);

	return (
		<DashboardContainer>
			<Navbar />
			<Ingredients setLoading={setLoading} />
			<Recipe loading={loading} setLoading={setLoading} />
			<Footer />
		</DashboardContainer>
	);
}

export default Home;
