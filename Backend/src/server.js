import express from "express";
import mongoose from "mongoose"; // Import Mongoose
import dotenv from "dotenv";
import http from "http"; // Import http for WebSocket
import { WebSocketServer } from "ws"; // Import WebSocket
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const wss = new WebSocketServer({ server }); // Create a WebSocket server
const { PORT = "5050", MONGODB_URI } = process.env; // Define your MongoDB URI in the .env file

import cors from "cors";
import recipeGenerator from "./API/generate.recipe.js";
import userRouter from "./Routes/user.router.js";
import authRouter from "./Routes/auth.router.js";
import corsOptions from "./Config/corsOptions.js";

const __dirname = path.resolve();

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "Views", "index.html"));
});

// Attach the WebSocket server to the recipe generator route
app.use((req, res, next) => {
	req.socket = wss;
	next();
});

app.use("/api/v1", authRouter);
app.use("/api/v1", recipeGenerator); // Pass WebSocket server to the recipe generator
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
	res.json("Hello World");
});

// Handle 404
app.use((req, res, next) => {
	res
		.status(404)
		.sendFile(path.resolve(__dirname, "public", "Views", "404.html"));
});

// Handle errors
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

// WebSocket connection handler
wss.on("connection", (ws) => {
	console.log("Client connected");

	ws.on("close", () => {
		console.log("Client disconnected");
	});
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
	server.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
});
