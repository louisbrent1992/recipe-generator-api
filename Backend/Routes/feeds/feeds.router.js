const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { PUBLIC_API, API_HOST, API_KEY } = process.env;

const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${PUBLIC_API}/feeds/list`, {
      params: { limit: "10", start: "0" },
      headers: {
        "X-RapidAPI-Host": API_HOST,
        "X-RapidAPI-Key": API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    return;
  }
});

module.exports = router;
