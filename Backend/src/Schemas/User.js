import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true, // Make the name field required
	},
	email: {
		type: String,
		required: true, // Make the email field required
		unique: true, // Ensure that emails are unique
	},
	password: {
		type: String,
		required: true, // Make the password field required
	},
	avatar: {
		type: Object,
	},
	savedRecipes: [
		{
			name: {
				type: String,
				required: true,
			},
			imgUri: {
				type: String,
				required: true,
			},
			ingredients: [
				{
					name: String,
				},
			],
			additionalIngredients: [
				{
					name: String,
				},
			],
			steps: [
				{
					type: String,
				},
			],
		},
	],
});

export default mongoose.model("User", userSchema);
