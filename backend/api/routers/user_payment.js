const express = require("express");
const userPaymentRouter = express.Router();

const {
  createUserPayment,
  getAllUserPayment,
  getAllUserPaymentById,
  updateUserPayment,
  destroyUserPayment,
} = require("../../db");


const {authenticate, admin} = require('../utils')

userPaymentRouter.post("/", authenticate, admin, async (req, res, next) => {
  const { id, payment_type, provider, account_no, expiry } = req.body;
  try {
    const createdUserPayment = await createUserPayment({
      id,
      payment_type,
      provider,
      account_no,
      expiry,
    });
    res.send(createdUserPayment);
  } catch (error) {
    next(error);
  }
});

userPaymentRouter.get("/", authenticate, admin, async (req, res, next) => {
  try {
    const allUserPayment = await getAllUserPayment();
    res.send(allUserPayment);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

userPaymentRouter.patch("/:userPaymentId", authenticate, admin, async (req, res, next) => {
  const { user_id, payment_type, provider, account_no, expiry } = req.body;
  const { userPaymentId } = req.params;
  const updateFields = {
    id: userPaymentId,
    user_id,
    payment_type,
    provider,
    account_no,
    expiry,
  };

  try {
    const getUserPayment = await getAllUserPaymentById(userPaymentId);
    if (!getUserPayment) {
      res.status(401);
      next({
        name: "NoOrderItemsError",
        message: "No oder item exist to update",
      });
    } else {
      console.log("Get Order Items to Update:", getUserPayment);
      const updatedUserPayment = await updateUserPayment(
        userPaymentId,
        updateFields
      );
      console.log("Updated Order Items:", updatedUserPayment);
      res.send(updatedUserPayment);
    }
  } catch (error) {
    next(error);
  }
});

//userLoggedIn
userPaymentRouter.delete("/:userPaymentId", authenticate, admin, async (req, res, next) => {
  const { userPaymentId } = req.params;

  try {
    const deleteUserPayment = await destroyUserPayment(userPaymentId);
    res.send(deleteUserPayment);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = userPaymentRouter;
