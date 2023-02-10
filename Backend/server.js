require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Recipe app running");
});

app.get("/recipes", (req, res) => {
  const data = {
    name: "recipe 1",
    ingredients: ["chicken", "broth", "vegetables"],
  };
  console.log(data);
  res.status(200).json();
});

app.listen(PORT || 5000, function () {
  console.log(`App listening on port ${PORT}`);
});
