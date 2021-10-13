import healthRouter from "./health";
import ordersRouter from "./order";
import paymentsRouter from "./payment";
import productsRouter from "./products";
import usersRouter from "./users";
import { requiredNotSent, requireLogin } from "./utils";

export { requiredNotSent, requireLogin };

module.exports = {
  healthRouter,
  ordersRouter,
  paymentsRouter,
  productsRouter,
  usersRouter,
};
