const express = require("express");
const apiRouter = express.Router();

const { getUserById } = require("../db/adapters/users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      console.log("from index api", id)
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/health", require("./utils/health"));
apiRouter.use("/cart-items", require("./routers/cart_items"));
apiRouter.use("/order_details", require("./routers/order_details"));
apiRouter.use("/order_items", require("./routers/order_items"));
apiRouter.use("/payment_details", require("./routers/payment_details"));
apiRouter.use("/product_category", require("./routers/product_category"));
apiRouter.use("/product_discount", require("./routers/product_discount"));
apiRouter.use("/product-inventory", require("./routers/product_inventory"));
apiRouter.use("/products", require("./routers/products"));
apiRouter.use("/shopping-session", require("./routers/shopping_session"));
apiRouter.use("/user-address", require("./routers/user_address"));
apiRouter.use("/user_payment", require("./routers/user_payment"));
apiRouter.use("/users", require("./routers/users"));

module.exports = apiRouter;
