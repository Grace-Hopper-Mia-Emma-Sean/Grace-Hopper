const { client } = require("../../db/client");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // console.log("hit auth");
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) return res.sendStatus(403);
  const bearer = authHeader.split(" ");
  const token = bearer[1];
  req.token = token;
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    res.locals.username = req.user.username;
    next();
  });
};

const owner = async (req, res, next) => {
  // console.log("hit owner");
  const username = res.locals.username;
  const {
    rows: [user],
  } = await client.query(`
    SELECT id, "isAdmin"
    FROM users
    WHERE username='${username}'
  `);
  res.locals.params = req.params.userId || req.params.user_id;
  user.isAdmin == true || res.locals.params == req.user.id
    ? next()
    : res.sendStatus(403);
};

const admin = async (req, res, next) => {
  // console.log("hit admin");
  if (res.locals.params == req.user.id) {
    next();
  } else {
    const username = res.locals.username;
    const {
      rows: [role],
    } = await client.query(`
    SELECT "isAdmin"
    FROM users
    WHERE username='${username}'
  `);
    if (role.isAdmin !== true) return res.sendStatus(403);
    next();
  }
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
  admin,
  owner,
  requiredNotSent,
  userLoggedIn,
  dbFields,
};
