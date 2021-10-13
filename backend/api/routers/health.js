const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", async (req, res, next) => {
  res.send({ message: "Server is up and healthy ^_^" });
});

module.exports = healthRouter;
