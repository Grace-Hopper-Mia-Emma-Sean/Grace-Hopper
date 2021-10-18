const express = require("express");
const shoppingSessionRouter = express.Router();

const {
  createUserShoppingSession,
  getAllUserShoppingSessions,
  getUserShoppingSessionById,
  updateUserShoppingSession,
  deleteUserShoppingSession,
} = require("../../db");

/**
 *
 * DONE: createUserShoppingSession
 * DONE: getAllUserShoppingSessions
 * DONE: deleteUserShoppingSession
 *
 * TODO: getUserShoppingSessionById => if we include that... then would be called in updateUserShoppingSession?
 * TODO: updateUserShoppingSession
 *
 */

shoppingSessionRouter.post("/", async (req, res, next) => {
  const { user_id, total } = req.body;
  try {
    const shoppingSession = await createUserShoppingSession({ user_id, total });
    res.send(shoppingSession);
  } catch (error) {
    next(error);
  }
});

shoppingSessionRouter.get("/", async (req, res, next) => {
  try {
    const shoppingSession = await getAllUserShoppingSessions();
    res.send(shoppingSession);
  } catch (error) {
    next(error);
  }
});

shoppingSessionRouter.patch("/", async (req, res, next) => {});

shoppingSessionRouter.delete("/:shoppingSessionId", async (req, res, next) => {
  const { shoppingSessionId } = req.params;
  try {
    const shoppingSession = await deleteUserShoppingSession(shoppingSessionId);
    res.send(shoppingSession);
  } catch (error) {
    next(error);
  }
});

module.exports = shoppingSessionRouter;
