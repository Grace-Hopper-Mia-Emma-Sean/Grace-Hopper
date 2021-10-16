const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userLogin } = require("../utils");
const usersRouter = express.Router();

/**
 * TODO: Decide what's a wishlist item and what's necessary
 *
 * logging in = POST
 * register = POST
 * profile/acct info = GET, POST, PATCH (// ? and let them DELETE)
 * order history = GET
 *
 */

usersRouter.get("/account", userLogin, async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await getAccountById(id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  "/account/orders/:orderNumber",
  userLogin, // ! and require owner of that order
  async (req, res, next) => {
    try {
      const { orderNumber } = req.params;
      const order = await getOrderByUser({ orderNumber });
      res.send(order);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get(
  "/account/orders",
  userLogin, // ! and require ownder of that order
  async (req, res, next) => {
    try {
      const { username } = req.params;
      const orders = await getOrdersByUser(id);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password must be 8 or more characters",
      });
    } else {
      const user = await createUser({ username, password });

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        user: user,
        message: "Thank you for signing up!",
        token: token,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (user && passwordsMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET
      );

      delete user.password;

      res.send({
        user: user,
        message: "you're logged in!",
        token: token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
