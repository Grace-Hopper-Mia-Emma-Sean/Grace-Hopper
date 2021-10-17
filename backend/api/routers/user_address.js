const express = require("express");
const userAddressRouter = express.Router();

const {
  createUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("../../db");

const { userLogin, requiredNotSent } = require("./utils");

/**
 *
 * DONE: createUserAddress
 *
 * TODO: getUserAddressById
 * TODO: updateUserAddress,
 * TODO: deleteUserAddress,
 *
 */

userAddressRouter.post("/:userId", async (req, res, next) => {
  const {
    user_id,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    telephone,
    mobile,
  } = req.body;
  try {
    const address = await createUserAddress({
      user_id,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
      telephone,
      mobile,
    });
    res.send(address);
  } catch (error) {
    next(error);
  }
});

userAddressRouter.get("/", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const address = await getUserAddressById(userId);
    if (!address) {
      res.status(404);
      next({
        name: "NoUserError",
        message: "No user exists with that id",
      });
    }
    res.send(address);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// userAddressRouter.post("/", userLogin, async (req, res, next) => {});

// userAddressRouter.get("/:id", userLogin, async (req, res, next) => {});

// userAddressRouter.patch("/:id", userLogin, async (req, res, next) => {});

module.exports = userAddressRouter;
