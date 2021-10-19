const express = require("express");
const cartItemsRouter = express.Router();

const {
  createUserCartItems,
  getAllUserCartItems,
  getUserCartItemsById,
  updateUserCartItems,
  deleteUserCartItems,
} = require("../../db");

/**
 *
 * DONE: createUserCartItems
 * DONE: getAllUserCartItems
 * DONE: deleteUserCartItems
 *
 * TODO: getUserCartItemsById => if we include that... then would be called in updateUserCartItems?
 * TODO: updateUserCartItems
 *
 */

cartItemsRouter.post("/", async (req, res, next) => {
  const { session_id, product_id, quantity } = req.body;
  try {
    const cartItems = await createUserCartItems({
      session_id,
      product_id,
      quantity,
    });
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.get("/", async (req, res, next) => {
  try {
    const cartItems = await getAllUserCartItems();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.patch("/", async (req, res, next) => {});

cartItemsRouter.delete("/:cartItemsId", async (req, res, next) => {
  const { cartItemsId } = req.params;
  try {
    const cartItems = await deleteUserCartItems(cartItemsId);
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemsRouter;
