const express = require("express");
const usersRouter = express.Router();

const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");
const { client } = require("../../db/client");
const jwt = require("jsonwebtoken");
const { userLogin, dbFields, requiredNotSent } = require("../utils");

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  deleteUserAddress,
  deleteShoppingSession,
  deleteUserCartItems,
} = require("../../db");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      telephone,
      email,
      isAdmin,
    } = req.body;
    const _user = await getUserByUsername(username);
    if (_user) {
      return res.status(404).send({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      return res.status(404).send({
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
        email,
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
  } catch (error) {
    throw error;
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password",
      });
    const user = await getUserByUsername(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);
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
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/", async (req, res, next) => {
  const users = await getAllUsers();
  if (!users) res.status(404).send({ name: "NoUserError" });
  res.status(200).send(users);
});

usersRouter.get("/:userId", async (req, res, next) => {
  const user = await getUserById(req.params.userId);
  if (!user)
    return res.status(404).send({
      name: "NoUserError",
      message: `No user exists with id ${req.params.userId}`,
    });
  res.status(200).send(user);
});

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user)
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${user}`,
      });
    const updateFields = {
      username: req.body.username || user.username,
      first_name: req.body.first_name || user.first_name,
      last_name: req.body.last_name || user.last_name,
      telephone: req.body.telephone || user.telephone,
      email: req.body.email || user.email,
      isAdmin:
        req.body.isAdmin === true
          ? true
          : req.body.isAdmin === false
          ? false
          : user.isAdmin,
    };
    const userChanges = await updateUser(req.params.userId, updateFields);
    delete userChanges.password;
    return res.send(userChanges);
  } catch (error) {
    throw error;
  }
});

usersRouter.delete("/:userId/", async (req, res, next) => {
  try {
    const userId = await getUserById(req.params.userId);
    if (!userId) {
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${req.params.userId}`,
      });
    } else {
      // const cartItems = await deleteUserCartItems(/*parameters*/);
      const shoppingSession = await deleteShoppingSession(userId);
      const address = await deleteUserAddress(userId);
      const user = await deleteUser(userId);
      const data = {
        user: user,
        address: address,
        shoppingSession: shoppingSession,
        // cartItems: cartItems,
      };
      res.status(200).send({
        message: `user with id ${req.params.userId} was successfully deleted`,
        data: data,
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
