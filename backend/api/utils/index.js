const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   console.log("hitting 0");
//   try {
//     console.log("hitting 1");
//     const authHeader = req.headers.authorization;
//     console.log("hitting 2");
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
//         if (error) return res.sendStatus(403);
//         req.user = user;
//         next();
//       });
//     }
//   } catch (error) {
//     console.log("hitting none");
//   }
// };

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) return res.sendStatus(403);
  const bearer = authHeader.split(" ");
  const token = bearer[1];
  req.token = token;
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const admin = async (req, res, next) => {
  const role = await getUserById(req.user.id);
};

const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    if (atLeastOne) {
      let numParamsFound = 0;
      for (let param of requiredParams) {
        if (req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if (!numParamsFound) {
        next({
          name: "MissingParams",
          message: `Must provide at least one of these in body: ${requiredParams.join(
            ", "
          )}`,
        });
      } else {
        next();
      }
    } else {
      const notSent = [];
      for (let param of requiredParams) {
        if (req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if (notSent.length)
        next({
          name: "MissingParams",
          message: `Required Parameters not sent in body: ${notSent.join(
            ", "
          )}`,
        });
      next();
    }
  };
};

const userLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
};

const dbFields = (fields) => {
  const insert = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  const select = Object.keys(fields)
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  const vals = Object.values(fields);
  return { insert, select, vals };
};

module.exports = {
  authenticate,
  requiredNotSent,
  userLoggedIn,
  dbFields,
};
