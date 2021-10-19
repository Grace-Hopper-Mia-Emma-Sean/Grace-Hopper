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
 * DONE: getAllUserAddresses
 * DONE: deleteUserAddress => handled through users router... we don't want users to be able to delete their own address, right? Unless they're permanently deleting their acct.
 *
 * TODO: getUserAddressById => if we include that... then would be called in updateUserAddress?
 * TODO: updateUserAddress
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
  const addresses = await getAllUserAddresses();
  if (!addresses) res.status(404).send({ name: "NoAddressError" });
  res.status(200).send(addresses);
});

module.exports = userAddressRouter;
