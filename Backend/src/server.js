import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

import cors from "cors";
import recipeGenerator from "./API/generator.js";

app.use(cors());

app.use(express.json());

app.use("/api/v1", recipeGenerator);

app.get("/", (req, res) => {
	res.json("Hello World");
});

app.listen(`${PORT}`, () => {
	console.log(`App listening on port ${PORT}`);
});
