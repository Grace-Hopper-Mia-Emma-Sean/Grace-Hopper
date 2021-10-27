const { client } = require("../../db/client");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // console.log("hit auth");
  const authHeader = req.headers["authorization"];
  // if the user isn't registered, they can still use the site--hence next() and not 403--to add items to their cart, etc., but their items would be stored locally, not on the db, until going to purchase
  if (authHeader == undefined) next();
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

module.exports = {
  authenticate,
  admin,
  owner,
};
