import express from "express";
import User from "../Schemas/User.js";
import multer from "multer";
import sharp from "sharp";

const router = express.Router();

const storage = multer.memoryStorage(); // Store files in memory as buffers

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// User avatar upload route with Multer
router.put(
	"/user/avatar_upload/:id",
	upload.single("avatar"),
	async (req, res) => {
		const { id } = req.params;

		// Initialize avatar data to null
		let avatarData = null;

		// Check if a file was uploaded
		if (req.file) {
			// Check the file format (you can add more formats as needed)

			// Attempt to compress and resize the image using sharp
			try {
				let outputFormat = req.file.originalname.split(".").pop().toLowerCase();
				if (!["jpeg", "jpg", "png", "gif"].includes(outputFormat)) {
					outputFormat = "jpeg"; // Default to JPEG if the format is not supported
				}

				const compressedImageBuffer = await sharp(req.file.buffer)
					.resize(200) // Set your desired width (in pixels)
					.toFormat(outputFormat) // Set the output format based on the file extension
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

		try {
			const userFound = await User.findById(id);

			if (userFound) {
				const updatedUser = await User.findByIdAndUpdate(
					id,
					{ $set: { avatar: avatarData } },
					{ new: true }
				);

				res.status(200).json(updatedUser);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}
);

// Update a user by ID
router.put("/user/:userId", async (req, res) => {
	try {
		// Extract the userId from the URL parameters
		const { userId } = req.params;

		// Extract updated user data from the request body
		const updatedUserData = req.body;

		// Find and update the user by their ID in the database
		const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
			new: true,
		});

		// Check if the user exists
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Return a successful response with the updated user
		res.status(200).json(updatedUser);
	} catch (error) {
		// Handle errors and return an error response
		res.status(500).json({ error: error.message });
	}
});

// Delete a user by ID
router.delete("/user/:userId", async (req, res) => {
	try {
		// Extract the userId from the URL parameters
		const { userId } = req.params;

		// Find and delete the user by their ID in the database
		const deletedUser = await User.findByIdAndDelete(userId);

		// Check if the user exists
		if (!deletedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		// Return a successful response with no content
		res.status(204).end();
	} catch (error) {
		// Handle errors and return an error response
		res.status(500).json({ error: error.message });
	}
});

export default router;
