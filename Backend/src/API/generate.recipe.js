import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { RandomizedRecipeTitles, bestCookbooks } from "./recipeBooks.js";

dotenv.config();

const router = express.Router();

const {
	SERVER_ID,
	CHANNEL_ID,
	SALAI_TOKEN,
	HUGGINGFACE_TOKEN,
	OPENAI_API_KEY,
} = process.env;

const openaiClient = new OpenAI({
	apiKey: OPENAI_API_KEY || "",
});

router.get("/generate-recipe", (req, res) => {
	res.status(200).json({
		message: "Welcome to the recipe generator API 🥗",
	});
});

router.post("/generate-recipe", async (req, res) => {
	const ingredients = req.body.ingredients || [];
	const feelingLucky = req.body.feelingLucky || false;
	const ws = req.socket; // Access the WebSocket server from the request

	try {
		if (!ingredients.length && !feelingLucky) {
			return res.status(400).json({
				error: {
					message: "No ingredients provided.",
				},
			});
		}

		// Send initial progress update
		ws.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(
					JSON.stringify({
						update: "Starting recipe generation...",
						progress: 30,
					})
				);
			}
		});

		let openaiResponse;
		const jsonIngredients = JSON.stringify(ingredients);
		if (feelingLucky) {
			// Send progress update
			ws.clients.forEach((client) => {
				if (client.readyState === 1) {
					client.send(
						JSON.stringify({
							update: "Fetching random recipe...",
							progress: 40,
						})
					);
				}
			});

			const randomizedTitles = new RandomizedRecipeTitles();

			// Add recipe titles
			bestCookbooks.forEach((book) => randomizedTitles.add(book.title));

			// Get a random title
			const randomTitle = randomizedTitles.getRandomTitle();

			const jsonRecipeBook = JSON.stringify(randomTitle);

			openaiResponse = await openaiClient.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: `Hello I am a recipe generator. I will find a unique recipe in the book "${jsonRecipeBook}" for you. Please wait a moment.
						
						The response will be in the following json format:

						{
							"name": "recipe name",
							"ingredients": [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							"steps": [
								
									"step 1",
									
								
					
									"step 2"
									
							
							]
							
						
						}`,
					},
					{
						role: "user",
						content: `${jsonRecipeBook}`,
					},
					{
						role: "system",
						content: `
						{
						
							"name": "recipe name",
							"ingredients": [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"

								}
							],
							"steps": [
								
									"step 1",
									
								
					
									"step 2"
									
							
							],
							"feelingLucky": "true"
							
						
						}`,
					},
				],

				temperature: 0.7,
			});
		} else {
			// Send progress update
			ws.clients.forEach((client) => {
				if (client.readyState === 1) {
					client.send(
						JSON.stringify({
							update: "Generating recipe using provided ingredients...",
							progress: 40,
						})
					);
				}
			});

			openaiResponse = await openaiClient.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: `
					Hello I am a recipe generator. I will generate a random recipe for you using some or all of the ingredients you provide, also, I will provide up to a maximum of 3 additional ingredients if needed to complete the meal. Please provide an array of ingredients in the following format:

					[
						{
							"_id": "ingredient id",
							"name": "ingredient name"
		
						},
						{
							"_id": "ingredient id",
							"name": "ingredient name"

						}
					]
						

					The response will be in the following json format:

					 {
							"name": "recipe name",
							"ingredients": [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								},
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							"steps": [								
									1."instruction",
									2." instruction"							
							],
							"feelingLucky": "false"
						}
						
					}`,
					},
					{
						role: "user",
						content: `${jsonIngredients}`,
					},
					{
						role: "system",
						content: `
					{
						
							"name": "recipe name",
							"ingredients": [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
							"_id": "ingredient id",
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"

								}
							],
							"steps": [
								
									"step 1",
									
								
					
									"step 2"
									
							
							]
							
						
					}

				}
			}`,
					},
				],

				temperature: 0.7,
			});
		}

		const completion = openaiResponse.choices[0];

		if (!completion) {
			return res.status(500).json({
				error: {
					message: "An error occurred during recipe generation.",
				},
			});
		}

		const responseContent = completion.message.content;

		// Extract only the JSON portion using regular expressions
		const jsonMatch = responseContent.match(/\{.*\}/s);

		if (!jsonMatch) {
			return res.status(500).json({
				error: {
					message: "Unable to parse recipe response.",
				},
			});
		}

		const jsonContent = jsonMatch[0];

		const recipeObject = await JSON.parse(jsonContent);

		// Send progress update
		ws.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(
					JSON.stringify({
						update: "Found recipe! Generating recipe image with DALL-E 3...",
						progress: 65,
					})
				);
			}
		});

		// DALL-E 3 Image Generation
		// NOTE: This section can be replaced with Midjourney integration
		const prompt = `A photorealistic, appetizing image of ${recipeObject.name}, studio lighting, high-quality food photography style`;

		const imageResponse = await openaiClient.images.generate({
			model: "dall-e-3",
			prompt: prompt,
			n: 1,
			size: "1024x1024",
		});

		const imageUri = imageResponse.data[0].url;

		// MIDJOURNEY INTEGRATION:
		// To use Midjourney instead of DALL-E 3, you would:
		// 1. Set up a connection to the Midjourney API or Discord bot
		// 2. Send the prompt to Midjourney
		// 3. Wait for the image generation to complete
		// 4. Retrieve the generated image URL
		// 5. Assign the Midjourney image URL to imageUri
		//
		// const imageUri = await generateMidjourneyImage(prompt);
		//
		// You'll need to implement the generateMidjourneyImage function
		// to handle the Midjourney API calls and image retrieval

		// Send progress update
		ws.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(
					JSON.stringify({
						update: "Recipe image generated successfully!",
						progress: 100,
					})
				);
			}
		});

		recipeObject.img = imageUri;

		// Send recipe data to the client
		res.status(200).json(recipeObject);

		// Log prompt and image URI
		console.log("🥗", {
			Prompt: prompt,
			GeneratedImage: imageUri,
		});
	} catch (error) {
		// Handle errors as needed
		console.error(error);

		ws.clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(
					JSON.stringify({
						update: "Error during recipe generation.",
						error: error.message,
					})
				);
			}
		});

		res.status(500).json({
			error: {
				message: "An error occurred during your request.",
			},
		});
	}
});

export default router;
