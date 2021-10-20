const express = require("express");
const shoppingSessionRouter = express.Router();

const {
  createShoppingSession,
  getAllShoppingSessions,
  getUserById,
  getShoppingSessionByUserId,
  updateShoppingSession,
  deleteShoppingSession,
} = require("../../db");

const { userLoggedIn, requiredNotSent } = require("./utils");

shoppingSessionRouter.post("/:userId", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user)
      return res.status(404).send({
        name: "NoUserError",
        message: `No user exists with id ${req.params.userId}`,
      });
    const existingSession = await getShoppingSessionByUserId(req.params.userId);
    if (existingSession)
      return res.status(401).send({
        name: "ShoppingSessionExistsError",
        message: `User with id ${req.params.userId} already has a shopping session`,
      });
    const shoppingSession = await createShoppingSession({
      user_id: req.params.userId,
      total: req.body.total,
    });
    res.send({
      message: `shopping session created successfully for user id ${req.params.userId}`,
      shoppingSession: shoppingSession,
    });
  } catch (error) {
    next(error);
  }
});

shoppingSessionRouter.get("/", async (req, res, next) => {
  try {
    const shoppingSession = await getAllShoppingSessions();
    res.send(shoppingSession);
  } catch (error) {
    next(error);
  }
});

shoppingSessionRouter.get("/:user_id", async (req, res, next) => {
  try {
    const shoppingSession = await getShoppingSessionByUserId(
      req.params.user_id
    );
    console.log(shoppingSession);
    res.send(shoppingSession);
  } catch (error) {
    throw error;
  }
});

shoppingSessionRouter.put("/:user_id", async (req, res, next) => {
  try {
    const session = await getShoppingSessionByUserId(req.params.user_id);
    if (!session)
      return res.status(404).send({
        name: "NoShoppingSessionError",
        message: `No shopping session exists for user with id ${req.params.user_id}`,
      });
    const updateFields = {
      id: session.id,
      user_id: session.user_id,
      total: req.body.total,
    };
    if (JSON.stringify(session) === JSON.stringify(updateFields))
      return res.status(404).send({
        name: "NoUpdatesError",
        message: "No items for this entry are being updated",
      });
    const sessionChanges = await updateShoppingSession(
      req.params.user_id,
      updateFields
    );
    res.status(200).send({
      message: "shopping session was updated successfully",
      sessionChanges: sessionChanges,
    });
  } catch (error) {
    throw error;
  }
});

shoppingSessionRouter.delete("/:user_id", async (req, res, next) => {
  try {
    const session = await getShoppingSessionByUserId(req.params.user_id);
    console.log(session);
    if (!session)
      return res.status(404).send({
        name: "NoShoppingSessionError",
        message: `No shopping session exists for user with id ${req.params.user_id}`,
      });
    const deleteSession = await deleteShoppingSession(req.params.user_id);
    res.send(deleteSession);
  } catch (error) {
    throw error;
  }
});

module.exports = shoppingSessionRouter;
