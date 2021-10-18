const express = require("express");
const bcrypt = require("bcryptjs");
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
} = require("../../db");
const usersRouter = express.Router();

/**
 *
 * DONE: createUser (register)
 * DONE: getAllUsers
 * DONE: getUserById
 * DONE: deleteUser => if a user deletes their acct, someone else can register with that retired name - do we want to keep this functionality?
 *
 * TODO: createUser (login) => 404
 * TODO: updateUser => 404
 * TODO: getUserByUsername => 404 but works during register
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

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      res.status(404);
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

usersRouter.get("/:username", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.username);
    if (!user) {
      res.status(404);
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

usersRouter.patch(
  "/:routineId",
  requiredNotSent({
    requiredParams: ["username, first_name, last_name, telephone, isAdmin"],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    const { userId } = req.params;
    const { username, first_name, last_name, telephone, isAdmin } = req.body;
    // const { id: userId } = req.user;
    try {
      const originalUser = await getUserById(userId);
      if (!originalUser) {
        next({
          name: "NotFound",
          message: `No user found by ID ${userId}`,
        });
        // } else if(userId !== originalUser.id) {
        //   res.status(403);
        //   next({name: "Unauthorized", message: "You cannot edit this routine!"});
        // } else {
        const newUser = await updateUser({
          id: userId,
          username,
          first_name,
          last_name,
          telephone,
          isAdmin,
        });
        res.send(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const address = await deleteUserAddress(userId);
    const user = await deleteUser(userId);
    if (!user) {
      res.status(404);
      next({
        name: "NoUserError",
        message: "No user exists with that ID to delete",
      });
    }
    const data = { user: user, address: address };
    res.send(data);
    // ? When the next() below is kept, nodemon returns a `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client` message, but all instances of the user are still removed regardless
    // next({ name: "UserDeleted", message: "User successfully deleted" });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
