import express from "express";
import User from "../Schemas/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import sharp from "sharp"; // Import Sharp
import { OAuth2Client } from "google-auth-library";
import { upload, validateForm } from "../Middleware/functions.js";

dotenv.config();

const router = express.Router();

const { GOOGLE_CLIENT_ID, JWT_SECRET } = process.env;

router.post(
	"/register",
	validateForm,
	upload.single("avatar"),
	async (req, res) => {
		try {
			// Extract user data from the request body
			const { name, email, password } = req.body;

			// Initialize avatar data to null
			let avatarData = null;

			// Check if a file was uploaded
			if (req.file) {
				// Check the file format (you can add more formats as needed)
				let outputFormat = req.file.mimetype.slice(6); // Default to JPEG

				// Attempt to compress and resize the image using sharp
				try {
					const compressedImageBuffer = await sharp(req.file.buffer)
						.resize(200) // Set your desired width (in pixels)
						.toFormat(outputFormat) // Set the output format based on the detected format
						.toBuffer();

					const imgUrl = `data:image/${outputFormat};base64,${compressedImageBuffer.toString(
						"base64"
					)}`;

					// Set avatar data if image processing was successful
					avatarData = imgUrl;
				} catch (sharpError) {
					console.error("Image Processing Error:", sharpError);
					return res
						.status(400)
						.json({ error: "Invalid image format or processing error." });
				}
			}

			// Handle registration logic
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create a new User instance with the provided data and avatar (if provided)
			const user = new User({
				name,
				email,
				password: hashedPassword,
				avatar: avatarData,
				savedRecipes: [],
				// You can add other fields as needed
			});

			// Save the new user to the database
			await user.save();

			// Return a successful response with the created user without the hashed password
			const userWithoutPassword = {
				_id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				savedRecipes: user.savedRecipes,
				// You can add other fields here if needed
			};

			res.status(201).json({ user: userWithoutPassword });
		} catch (error) {
			console.error("Create User Error:", error);
			res
				.status(500)
				.json({ error: "An error occurred while creating the user." });
		}
	}
);

// Google sign-up
router.post("/google-signup", async (req, res) => {
	const { googleAccessToken } = req.body;

	// Verify the Google credential (ID token) here
	// You can use libraries like `google-auth-library` to verify the token.

	try {
		// Verify the Google credential (ID token) here and obtain user information

		const client = new OAuth2Client(GOOGLE_CLIENT_ID); // Replace with your actual Google Client ID

		const ticket = await client.verifyIdToken({
			idToken: googleAccessToken,
			audience: GOOGLE_CLIENT_ID, // Replace with your actual Google Client ID
		});

		const payload = ticket.getPayload();
		// Check if user exists in the database

		const userEmail = payload.email; // User's email address

		const foundUser = await User.findOne({ email: userEmail });

		if (foundUser) {
			return res
				.status(409)
				.json({ error: "Account already exists, please sign in." });
		}

		const hashedPassword = await bcrypt.hash(payload.sub, 10);

		// Create a new User instance with the provided data and avatar (if provided)
		const user = new User({
			name: payload.name,
			email: payload.email,
			password: hashedPassword,
			avatar: payload.picture,
			savedRecipes: [],
			// You can add other fields as needed
		});

		// Save the new user to the database
		await user.save();

		// Return a successful response with the created user without the hashed password
		const userWithoutPassword = {
			_id: user._id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			savedRecipes: user.savedRecipes,
			// You can add other fields here if needed
		};

		res.status(201).json({ user: userWithoutPassword });
	} catch (error) {
		console.error("Create User Error:", error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the user." });
	}
});

// Login user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		// Await the result of User.findOne
		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({ error: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			foundUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		const userWithoutPassword = {
			_id: foundUser._id,
			name: foundUser.name,
			email: foundUser.email,
			avatar: foundUser.avatar,
			savedRecipes: foundUser.savedRecipes,
			// You can add other fields here if needed
		};

		const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, {
			expiresIn: "60",
		});

		res.status(200).json({ token, user: userWithoutPassword });
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ error: "An error occurred while logging in." });
	}
});

// Server-Side Route to Verify Google Access Token
router.post("/google-login", async (req, res) => {
	const { googleAccessToken } = req.body;

	// Verify the Google access token here
	// You can use libraries like `google-auth-library` or `jsonwebtoken` to verify the token.
	// Ensure that you have set up the necessary credentials with Google.

	try {
		// Verify the Google access token here and obtain user information

		const client = new OAuth2Client(GOOGLE_CLIENT_ID); // Replace with your actual Google Client ID

		const ticket = await client.verifyIdToken({
			idToken: googleAccessToken,
			audience: GOOGLE_CLIENT_ID, // Replace with your actual Google Client ID
		});

		const payload = ticket.getPayload();

		const userEmail = payload.email; // User's email address

		// You can also perform additional checks, like verifying the email domain, etc.

		// Check if the user already exists in your database based on the Google user ID or email.
		const foundUser = await User.findOne({ email: userEmail });

		if (!foundUser) {
			res.status(401).json({ error: "Account not found, please sign up." });
		} else {
			const isPasswordCorrect = await bcrypt.compare(
				payload.sub,
				foundUser.password
			);

			if (!isPasswordCorrect) {
				return res.status(401).json({ error: "Invalid credentials" });
			}

			// Create a new JWT token and send it to the user.
			const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, {
				expiresIn: "60",
			});

			// If the user exists, retrieve their information.
			const userWithoutPassword = {
				_id: foundUser._id,
				name: foundUser.name,
				email: foundUser.email,
				avatar: foundUser.avatar,
				savedRecipes: foundUser.savedRecipes,
			};

			res.status(200).json({ token, user: userWithoutPassword });
		}
	} catch (error) {
		console.error("Google token verification error:", error);
		res.status(401).json({ error: "Token verification failed" });
	}
});

export default router;
