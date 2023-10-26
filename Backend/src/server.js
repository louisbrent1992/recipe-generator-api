import express from "express";
import mongoose from "mongoose"; // Import Mongoose
import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT = '5050', MONGODB_URI } = process.env; // Define your MongoDB URI in the .env file

import cors from "cors";
import recipeGenerator from "./API/generate.recipe.js";
import userRouter from "./Routes/user.router.js";
import authRouter from "./Routes/auth.router.js";
import corsOptions from "./Config/corsOptions.js";
import path from "path";

const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "Views", "index.html"));
});

app.use("/api/v1", authRouter);
app.use("/api/v1", recipeGenerator);
app.use("/api/v1", userRouter);
app.get("/", (req, res) => {
	res.json("Hello World");
});

app.use((req, res, next) => {
	res
		.status(404)
		.sendFile(path.resolve(__dirname, "public", "Views", "404.html"));
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
	console.error("MongoDB connection error:", error);
});

db.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
});
