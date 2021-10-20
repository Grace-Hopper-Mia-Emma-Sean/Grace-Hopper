const express = require("express");
const cartItemsRouter = express.Router();

const {
  createCartItems,
  getCartItems,
  getCartItemsByUserId,
  updateCartItems,
  deleteCartItems,
  getUserById,
  getShoppingSessionByUserId,
} = require("../../db");

cartItemsRouter.post("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user)
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${req.params.userId}`,
      });
    const session = await getShoppingSessionByUserId(req.params.userId);
    if (!session)
      return res.status(401).send({
        name: "NoShoppingSessionError",
        message: `User with id ${req.params.userId} does not have a shopping session to which they can add cart items`,
      });
    console.log(session);
    const cartItems = await createCartItems({
      session_id: session.session_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    });
    res.send({
      message: `cart item added successfully for user id ${req.params.userId}`,
      cartItems: cartItems,
    });
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.get("/", async (req, res, next) => {
  const cartItems = await getCartItems();
  res.send(cartItems);
});

cartItemsRouter.get("/:user_id", async (req, res, next) => {
  const cartItems = await getCartItemsByUserId(req.params.user_id);
  res.send(cartItems);
});

cartItemsRouter.patch("/:user_id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.user_id);
    if (!user)
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${req.params.user_id}`,
      });
    const session = await getShoppingSessionByUserId(req.params.user_id);
    if (!session)
      return res.status(404).send({
        name: "NoShoppingSessionError",
        message: `User with id ${req.params.user_id} does not have a shopping session to which they can add cart items`,
      });
    const cartItems = await getCartItemsByUserId(req.params.user_id);
    if (!cartItems)
      return res.status(404).send({
        name: "NoCartItemsError",
        message: `User with id ${req.params.user_id} does not have any cart items to edit`,
      });
    const updateFields = { quantity: req.body.quantity };
    // console.log(cartItems.quantity, updateFields.quantity);
    if (cartItems.quantity === updateFields.quantity)
      return res.status(404).send({
        name: "NoUpdatesError",
        message: "No items for this entry are being updated",
      });
    console.log(req.params.user_id, updateFields.quantity);
    const cartChanges = await updateCartItems(
      req.params.user_id,
      updateFields.quantity
    );
    res.status(200).send({
      message: "cart items were updated successfully",
      cartChanges: cartChanges,
    });
  } catch (error) {
    throw error;
  }
});

cartItemsRouter.delete("/:cartItemsId", async (req, res, next) => {
  const { cartItemsId } = req.params;
  try {
    const cartItems = await deleteCartItems(cartItemsId);
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemsRouter;
