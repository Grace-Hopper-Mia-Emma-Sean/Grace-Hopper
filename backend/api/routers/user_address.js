const express = require("express");
const {
  createUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("..");
const { userLogin } = require("../utils");

const fields = {
  user_id,
  address_line1,
  address_line2,
  city,
  state,
  postal_code,
  country,
  telephone,
  mobile,
};

const userAddressRouter = express.Router();

userAddressRouter.post("/", userLogin, async (req, res, next) => {
  try {
    fields = req.body;
    const address = await createUserAddress(fields);
    if (address) res.send(address);
  } catch (error) {
    next(error);
  }
});

userAddressRouter.get("/:id", requireLogIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    const address = await getUserAddressById(id);
    res.send(address);
  } catch (error) {
    next(error);
  }
});

userAddressRouter.patch("/:id", userLogin, async (req, res, next) => {
  // TODO: require user owns
  const { id } = req.params;
  fields = req.body;
  const updateFields = {};
  updateFields.id = id;
  if (user_id) updateFields.user_id = user_id;
  if (address_line1) updateFields.address_line1 = address_line1;
  if (address_line2) updateFields.address_line2 = address_line2;
  if (city) updateFields.city = city;
  if (state) updateFields.state = state;
  if (postal_code) updateFields.postal_code = postal_code;
  if (country) updateFields.country = country;
  if (telephone) updateFields.telephone = telephone;
  if (mobile) updateFields.mobile = mobile;
  try {
    const originalAddress = await getUserAddressById(id);
    if (originalAddress) {
      const patchedAddress = await updateUserAddress(updateFields);
      res.send(patchedAddress);
    }
    res.send(address);
  } catch (error) {
    next(error);
  }
});

module.exports = userAddressRouter;
