const express = require("express");
const userAddressRouter = express.Router();

const {
  createUserAddress,
  getAddressByUserId,
  getAllUserAddresses,
  updateUserAddress,
  getUserById,
} = require("../../db");

const { authenticate, owner, admin } = require("../utils");

userAddressRouter.post(
  "/:userId",
  authenticate,
  owner,
  admin,
  async (req, res, next) => {
    const role = await getUserById(req.user.id);
    if (role.isAdmin !== true) return res.sendStatus(403);
    try {
      const user = await getUserById(req.params.userId);
      if (!user)
        return res.status(404).send({
          name: "NoUserError",
          message: `No user exists with id ${req.params.userId}`,
        });
      const {
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        telephone,
        mobile,
      } = req.body;
      const address = await createUserAddress({
        user_id: req.params.userId,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        telephone,
        mobile,
      });
      res.send({
        message: `address created successfully for user id ${req.params.userId}`,
        address: address,
      });
    } catch (error) {
      next(error);
    }
  }
);

userAddressRouter.get("/", authenticate, admin, async (req, res, next) => {
  const role = await getUserById(req.user.id);
  if (role.isAdmin !== true) return res.sendStatus(403);
  const addresses = await getAllUserAddresses();
  if (!addresses) res.status(404).send({ name: "NoAddressError" });
  res.status(200).send(addresses);
});

userAddressRouter.get(
  "/:userId",
  authenticate,
  owner,
  admin,
  async (req, res, next) => {
    const role = await getUserById(req.user.id);
    if (role.isAdmin !== true) return res.sendStatus(403);
    const address = await getAddressByUserId(req.params.userId);
    res.status(200).send(address);
  }
);

userAddressRouter.put(
  "/:user_id",
  authenticate,
  owner,
  admin,
  async (req, res, next) => {
    const role = await getUserById(req.user.id);
    if (role.isAdmin !== true) return res.sendStatus(403);
    try {
      const address = await getAddressByUserId(req.params.user_id);
      if (!address)
        return res.status(404).send({
          name: "NoUserError",
          message: `No user exists with id ${address}`,
        });
      const updateFields = {
        user_id: address.user_id,
        address_line1: req.body.address_line1 || address.address_line1,
        address_line2: req.body.address_line2 || address.address_line2,
        city: req.body.city || address.city,
        state: req.body.state || address.state,
        postal_code: req.body.postal_code || address.postal_code,
        country: req.body.country || address.country,
        telephone: req.body.telephone || address.telephone,
        mobile: req.body.mobile || address.mobile,
      };
      if (JSON.stringify(address) === JSON.stringify(updateFields))
        return res.status(404).send({
          name: "NoUpdatesError",
          message: "No items for this entry are being updated",
        });
      const addressChanges = await updateUserAddress(
        req.params.user_id,
        updateFields
      );
      res.status(200).send({
        message: "user address was updated successfully",
        addressChanges: addressChanges,
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = userAddressRouter;
