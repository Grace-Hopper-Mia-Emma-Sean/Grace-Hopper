const express = require("express");
const orderItemsRouter = express.Router();

const {
  getAllOrderItems,
  getAllOrderItemsById,
  updateOrderItems,
  destroyOrderItems,
  createOrderItems,
} = require("../../db");

const {authenticate, owner, admin} = require('../utils')

orderItemsRouter.post("/", async (req, res, next) => {
  const { order_id, product_id, quantity } = req.body;
  try {
    const createdOrderItems = await createOrderItems({
      order_id,
      product_id,
      quantity,
    });
    res.send(createdOrderItems);
  } catch (error) {
    next(error);
  }
});

orderItemsRouter.get("/", async (req, res, next) => {
  try {
    const allOrderItems = await getAllOrderItems();
    res.send(allOrderItems);
  } catch (error) {
    next(error);
  }
});
//userLoggedIn, requiredNotSent({requiredParams: ["id", "order_id", "product_id", "quantity"], atLeastOne: true})

orderItemsRouter.patch("/:orderItemsId", async (req, res, next) => {
  const { order_id, product_id, quantity } = req.body;
  const { orderItemsId } = req.params;
  const updateFields = { id: orderItemsId, order_id, product_id, quantity };

  try {
    const getOrderItems = await getAllOrderItemsById(orderItemsId);
    console.log("test", getOrderItems);
    if (!getOrderItems) {
      res.status(401);
      next({
        name: "NoOrderItemsError",
        message: "No oder item exist to update",
      });
    } else {
      const updatedOrderItems = await updateOrderItems(
        orderItemsId,
        updateFields
      );
      console.log("test", updatedOrderItems);
      res.send(updatedOrderItems);
    }
  } catch (error) {
    next(error);
  }
});

//userLoggedIn
orderItemsRouter.delete("/:orderItemsId", async (req, res, next) => {
  const { orderItemsId } = req.params;
  try {
    const deleteOrderItem = await destroyOrderItems(orderItemsId);
    res.send(deleteOrderItem);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderItemsRouter;
