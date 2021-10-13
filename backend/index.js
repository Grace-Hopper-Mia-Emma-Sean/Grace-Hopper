require("dotenv").config();

const apiRouter = require("./api");
const bodyParser = require("body-parser");
const { client } = require("./db/client/");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { PORT = 3000 } = process.env;
const server = express();

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(cors());
// TODO: Change api route as necessary
server.use("/api", apiRouter);

// TODO: If we want server logging in testing
// server.use((req, res, next) => {
//   console.log("<____Body Logger START____>");
//   console.log(req.body);
//   console.log("<_____Body Logger END_____>");
//   next();
// });

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send("Not Found!");
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error!" });
});

server.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});

client.connect();
