require("dotenv").config();

const apiRouter = require("./api");
const bodyParser = require("body-parser");
const { client } = require("./db/client/");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { PORT = 3000 } = process.env;
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use("/api", apiRouter);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send("Not Found!");
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error!" });
});

server.listen(PORT, () => console.log(`Server is up on port: ${PORT}`));

client.connect();
