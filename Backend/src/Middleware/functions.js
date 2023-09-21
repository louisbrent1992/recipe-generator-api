import multer from "multer"; // Import Multer

const storage = multer.memoryStorage();

/**
 * Uploads a file to memory.
 *
 * @type {*}
 */

export const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB in this example)
});

/**
 * Validates form data.
 *
 * @param {object} req - The request object containing the form data.
 * @param {object} res - The response object used to send a JSON response.
 * @param {function} next - The next function to be called if the form data is valid.
 * @returns {Promise<void>}
 */
export const validateForm = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		if (password.length < 6) {
			throw new Error("Password must be at least 6 characters.");
		}

		if (name.length < 3) {
			throw new Error("Name must be at least 3 characters.");
		}

		if (!email.includes("@") || !email.includes(".")) {
			throw new Error("Invalid email address.");
		}

		if (email.length < 6) {
			throw new Error("Email must be at least 6 characters.");
		}

		next();
	} catch (error) {
		res.status(409).json({ error: error.message });
	}
};
