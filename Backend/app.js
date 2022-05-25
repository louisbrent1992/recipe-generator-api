const express = require("express");
const app = express();

const feedsRouter = require("./Routes/feeds/feeds.router");

app.use(express.json());

app.use("/feeds/list", feedsRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
