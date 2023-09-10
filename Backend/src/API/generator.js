import dotenv from "dotenv";
import express from "express";
import { OpenAI } from "openai";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
});

router.post("/generate-recipe", async (req, res) => {
	const ingredients = req.body.ingredients || [];

	if (!ingredients) {
		res.status(400).json({
			error: {
				message: "No ingredients provided.",
			},
		});
		return;
	}

	const jsonIngredients = JSON.stringify(ingredients);

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `
					Hello I am a recipe generator. I will generate a random recipe for you using some or all of the ingredients you provide, also, I will provide a maximum of 3 additional ingredients if needed to complete the meal. Please provide an array of ingredients in the following format:

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
						

					The response will be in the following format:

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
									"step description",
									"step description"							
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
						"recipe": {
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
								{
									"step 1": "step description",
									"step 2": "step description"
								}
							]
							
						}
					}

				}
			}`,
				},
			],

			temperature: 0.7,
		});

		const completion = response.choices[0];
		console.log(completion.message.content);
		res.status(200).json({ result: completion.message.content });
	} catch (error) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
					message: "An error occurred during your request.",
				},
			});
		}
	}
});

export default router;
