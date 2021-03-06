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

const { authenticate, admin, owner } = require("../utils");

cartItemsRouter.post("/:user_id", authenticate, async (req, res, next) => {
  // const role = await getUserById(req.user.id);
  // if (role.isAdmin !== true) return res.sendStatus(403);
  try {
    const user = await getUserById(req.params.user_id);
    if (!user)
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${req.params.user_id}`,
      });
    // const session = await getShoppingSessionByUserId(req.params.user_id);
    // if (!session)
    //   return res.status(401).send({
    //     name: "NoShoppingSessionError",
    //     message: `User with id ${req.params.user_id} does not have a shopping session to which they can add cart items`,
    //   });
    // console.log(session);
    const cartItems = await createCartItems({
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
    });
    res.send({
      message: `cart item added successfully for user id ${req.params.user_id}`,
      cartItems: cartItems,
    });
  } catch (error) {
    next(error);
  }
});

cartItemsRouter.get("/", authenticate, admin, async (req, res, next) => {
  const role = await getUserById(req.user.id);
  if (role.isAdmin !== true) return res.sendStatus(403);
  const cartItems = await getCartItems();
  res.send(cartItems);
});

cartItemsRouter.get(
  "/:user_id",
  authenticate,
  owner,
  async (req, res, next) => {
    // const role = await getUserById(req.user.id);
    // if (role.isAdmin !== true) return res.sendStatus(403);
    const cartItems = await getCartItemsByUserId(req.params.user_id);
    res.send(cartItems);
  }
);

cartItemsRouter.patch(
  "/:cartItemsId/:userId",
  authenticate,
  async (req, res, next) => {
    try {
      console.log(req.params.userId);
      const cartChanges = await updateCartItems(
        req.params.cartItemsId,
        req.params.userId,
        req.body.quantity
      );
      res.status(200).send({
        message: "cart items were updated successfully",
        cartChanges: cartChanges,
      });
    } catch (error) {
      throw error;
    }
  }
);

cartItemsRouter.delete(
  "/:cartItemsId",
  authenticate,
  async (req, res, next) => {
    // const role = await getUserById(req.user.id);
    // if (role.isAdmin !== true) return res.sendStatus(403);
    const { cartItemsId } = req.params;
    try {
      const cartItems = await deleteCartItems(cartItemsId);
      res.send(cartItems);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = cartItemsRouter;
