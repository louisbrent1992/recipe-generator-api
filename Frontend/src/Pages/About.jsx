import React from "react";
import {
	BodyContainer,
	HeaderImage,
	List,
	ListItem,
	PageContainer,
	Paragraph,
	Title,
} from "../Styles/About";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function About() {
	return (
		<PageContainer>
			<Navbar />
			<BodyContainer>
				<HeaderImage
					src="https://res.cloudinary.com/client-images/image/upload/c_scale,w_600/v1695070874/eCommerce%20Site%20Images/about-image_sasb2y.png"
					alt="Recipe Finder Header"
				/>
				<Title>About Recipe Finder</Title>
				<Paragraph>
					Welcome to Recipe Finder, your go-to platform for discovering
					delicious recipes based on the ingredients you have on hand. We
					understand the challenges of meal planning, especially when you're
					faced with limited ingredients and a busy schedule. That's why we've
					created Recipe Finder to make cooking at home easier and more
					enjoyable.
				</Paragraph>
				<Paragraph>
					<strong>Addressing Scarcity Issues:</strong> We're on a mission to
					help individuals make the most of what they have. Recipe Finder
					empowers you to create delicious meals without the need for extensive
					grocery shopping. Save money and reduce food waste by cooking with
					what you already have.
				</Paragraph>
				<Title>Key Features:</Title>
				<List>
					<ListItem>
						<strong>Ingredient-Based Recipe Generation:</strong> Our app uses
						the power of OpenAI to generate creative and tasty recipes based on
						the ingredients you have available. No more wondering what to cook
						with the items in your pantry; Recipe Finder has you covered.
					</ListItem>
					<ListItem>
						<strong>High-Quality Recipe Images:</strong> We believe that visual
						presentation is just as important as the recipe itself. That's why
						we've partnered with Midjourney to provide stunning, mouth-watering
						images for each recipe.
					</ListItem>
				</List>
				<Paragraph>
					Whether you're a seasoned chef or a kitchen novice, Recipe Finder is
					here to inspire your culinary adventures. Start exploring our recipes
					today and embark on a journey of delightful flavors and innovative
					cooking.
				</Paragraph>
			</BodyContainer>

			<Footer />
		</PageContainer>
	);
}

export default About;
