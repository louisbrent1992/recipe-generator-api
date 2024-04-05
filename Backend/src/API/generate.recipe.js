import { Midjourney } from "midjourney";
import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const {
	SERVER_ID,
	CHANNEL_ID,
	SALAI_TOKEN,
	HUGGINGFACE_TOKEN,
	OPENAI_API_KEY,
} = process.env;

const midjourneyClient = new Midjourney({
	ServerId: SERVER_ID,
	ChannelId: CHANNEL_ID,
	SalaiToken: SALAI_TOKEN,
	HuggingFaceToken: HUGGINGFACE_TOKEN,
	Debug: true,
	Ws: true,
});

const openaiClient = new OpenAI({
	apiKey: OPENAI_API_KEY || "",
});

router.post("/generate-recipe", async (req, res) => {
	const ingredients = req.body.ingredients || [];
	const feelingLucky = req.body.feelingLucky || false;

	try {
		if (!ingredients.length && typeof feelingLucky === "undefined") {
			return res.status(400).json({
				error: {
					message: "No ingredients provided.",
				},
			});
		}

		let openaiResponse;
		const jsonIngredients = JSON.stringify(ingredients);
		if (feelingLucky) {
			openaiResponse = await openaiClient.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: `Hello I am a recipe generator. I will generate a random recipe for you.
						
						The response will be in the following json format:

						{
							"name": "recipe name",
							"ingredients": [
								{
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
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
						content: `${jsonIngredients}`,
					},
					{
						role: "system",
						content: `
						{
						
							"name": "recipe name",
							"ingredients": [
								{
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
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
				],

				temperature: 0.9,
			});
		} else {
			// Generate the recipe object using OpenAI
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
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								},
								{
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							"steps": [								
									1."instruction",
									2." instruction"							
							]
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
									"name": "ingredient name",
									"quantity": "ingredient quantity",
									"unit": "ingredient unit"
								}
							],
							additionalIngredients: [
								{
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
		// Generate the recipe image using Midjourney
		await midjourneyClient.init();
		const prompt = `${recipeObject.name}`;

		const Imagine = await midjourneyClient.Imagine(prompt, (uri) => {
			console.log("loading", uri);
		});

		if (!Imagine) {
			console.log("no message");
			return;
		}

		const Upscale = await midjourneyClient.Upscale({
			index: 1,
			msgId: Imagine.id,
			hash: Imagine.hash,
			flags: Imagine.flags,
			loading: (uri, progress) => {
				console.log("Upscale.loading", uri, "progress", progress);
			},
		});

		midjourneyClient.Close();

		recipeObject.img = Upscale.uri;

		res.status(200).json(recipeObject);
	} catch (error) {
		// Handle errors as needed
		console.error(error);
		res.status(500).json({
			error: {
				message: "An error occurred during your request.",
			},
		});
	}
});

export default router;
