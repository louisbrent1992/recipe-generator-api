const axios = require("axios");

const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://yummly2.p.rapidapi.com/feeds/list",
      {
        params: { limit: "10", start: "0" },
        headers: {
          "X-RapidAPI-Host": "yummly2.p.rapidapi.com",
          "X-RapidAPI-Key":
            "bb3dcee81dmsh1435eac7d6353f2p1288edjsn2f4ac64cb047",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    return;
  }
});

module.exports = router;
