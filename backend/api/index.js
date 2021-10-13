//TO DO: export URL for our database
//SAMPLE: export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';
//UTILIZE this BASE_URL throughout React framework

const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
// TODO: change getUserById import once names are finalized
// const { getUserById } = require("../db/adapters/users");
const { JWT_SECRET } = process.env;

// TODO: Tweak / comment back in when ready to use
// apiRouter.use(async (req, res, next) => {
//   const prefix = "Bearer ";
//   const auth = req.header("Authorization");
//   if (!auth) {
//     next();
//   } else if (auth.startsWith(prefix)) {
//     const token = auth.slice(prefix.length);
//     try {
//       const { id } = jwt.verify(token, JWT_SECRET);
//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: "AuthorizationHeaderError",
//       message: `Authorization token must start with ${prefix}`,
//     });
//   }
// });

// TODO: Change routes once we're ready
apiRouter.use("/health", require("../../../backend/api/routers"));
apiRouter.use("/orders", require("../../../backend/api/routers"));
apiRouter.use("/payments", require("../../../backend/api/routers"));
apiRouter.use("/products", require("../../../backend/api/routers"));
apiRouter.use("/users", require("../../../backend/api/routers"));

module.exports = apiRouter;
