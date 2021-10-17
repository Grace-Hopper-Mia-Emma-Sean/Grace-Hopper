const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userLogin } = require("../utils");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("../../db");
const usersRouter = express.Router();

/**
 *
 * DONE: createUser (register), getAllUsers, getUserById
 *
 * TODO: createUser (login), getUserByUsername (works when used in register...?)
 *
 */

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, first_name, last_name, telephone, isAdmin } =
    req.body;
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
      const user = await createUser({
        username,
        password,
        first_name,
        last_name,
        telephone,
        isAdmin,
      });

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
        message: "You're logged in!",
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

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// DONE
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      res.status(401);
      next({
        name: "NoUserError",
        message: "No user exists with that id",
      });
    }
    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// TODO
usersRouter.get("/:username", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.username);
    if (!user) {
      res.status(401);
      next({
        name: "NoUserError",
        message: "No user exists with that username",
      });
    }
    res.send(user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
