const express = require("express");
const orderDetailsRouter = express.Router();

const {
  getAllOrderDetailsById,
  destroyOrderDetails,
  updateOrderDetails,
  getAllOrderDetails,
  createOrderDetails,
} = require("../../db");

const { authenticate, admin } = require("../utils");

// orderDetailsRouter.post("/", async (req, res, next) => {
//   try {
//     // const { user_id, total,  payment_id  } = req.body;
//     const createdOrderDetails = await createOrderDetails({
//       user_id: req.body.user_id,
//       total: req.body.total,
//       payment_id: req.body.payment_id,
//     });
//     res.status(200).send({ createdOrderDetails: createdOrderDetails });
//   } catch (error) {
//     next(error);
//   }
// });

orderDetailsRouter.post("/", async (req, res, next) => {
  try {
    const order = await createOrderDetails({
      user_id: req.body.user_id,
      total: req.body.total,
      payment_id: req.body.payment_id,
    });
    res.send({ order: order });
  } catch (error) {
    throw error;
  }
});

orderDetailsRouter.get("/", async (req, res, next) => {
  try {
    const allOrderDetails = await getAllOrderDetails();
    res.send(allOrderDetails);
  } catch (error) {
    next(error);
  }
});

orderDetailsRouter.patch("/:orderDetailsId", async (req, res, next) => {
  const { user_id, total, payment_id } = req.body;
  const { orderDetailsId } = req.params;

  const updateFields = { id: orderDetailsId, user_id, total, payment_id };

  try {
    const getOrderDetails = await getAllOrderDetailsById(orderDetailsId);
    if (!getOrderDetails) {
      res.status(401);
      next({
        name: "NoOrderItemsError",
        message: "No oder details exist to update",
      });
    } else {
      console.log("Get Order Details to Update:", getOrderDetails);
      const updatedOrderDetails = await updateOrderDetails(
        orderDetailsId,
        updateFields
      );
      console.log("Updated Order Details:", updatedOrderDetails);
      res.send(updatedOrderDetails);
    }
  } catch (error) {
    next(error);
  }
});

orderDetailsRouter.delete("/:orderDetailsId", async (req, res, next) => {
  const { orderDetailsId } = req.params;

  try {
    const deleteOrderDetails = await destroyOrderDetails(orderDetailsId);
    res.send(deleteOrderDetails);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderDetailsRouter;
