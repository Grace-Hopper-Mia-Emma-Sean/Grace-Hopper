const express = require("express");
const userAddressRouter = express.Router();

const {
  createUserAddress,
  getAllUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} = require("../../db");

const { userLogin, requiredNotSent } = require("./utils");

/**
 *
 * DONE: createUserAddress
 *
 * TODO: getAllUserAddresses
 * TODO: updateUserAddress
 * TODO: deleteUserAddress
 *
 */

userAddressRouter.post("/", async (req, res, next) => {
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
  try {
    const address = await getAllUserAddresses();
    res.send(address);
  } catch (error) {
    next(error);
  }
});

// userAddressRouter.post("/", userLogin, async (req, res, next) => {});

// userAddressRouter.get("/:id", userLogin, async (req, res, next) => {});

// userAddressRouter.patch("/:id", userLogin, async (req, res, next) => {});

module.exports = userAddressRouter;
