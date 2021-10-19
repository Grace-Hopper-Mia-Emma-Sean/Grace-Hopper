const express = require("express");
const shoppingSessionRouter = express.Router();

const {
  createUserShoppingSession,
  getAllUserShoppingSessions,
  getUserById,
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
  if (!shoppingSessionId)
    return res.status(404).send({
      name: "NoShoppingSessionError",
      message: `No shopping exists with id ${req.params}`,
    });
  const shoppingSession = await deleteUserShoppingSession(req.params);
  res.send(shoppingSession);
});

module.exports = shoppingSessionRouter;
