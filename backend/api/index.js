//TO DO: export URL for our database
//SAMPLE: export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';
//UTILIZE this BASE_URL throughout React framework

const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
// TODO: change getUserById import once names are finalized
// const { getUserById } = require("../db/adapters/users");
const { JWT_SECRET } = process.env;

// TODO: Tweak / comment back in when ready to use
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
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

// TODO: Change routes once we're ready
apiRouter.use("/health", require("./utils/health"));
// ! Commented out until there's routers for the following modules:
apiRouter.use("/cart-items", require("./routers/cart_items"));
apiRouter.use("/order-details", require("./routers/order_details"));
apiRouter.use("/order-items", require("./routers/order_items"));
apiRouter.use("/payment-details", require("./routers/payment_details"));
// apiRouter.use("/product-category-", require("./routers/product_category"));
// apiRouter.use("/product-discount", require("./routers/product_discount"));
// apiRouter.use("/product-inventory", require("./routers/product_inventory"));
// apiRouter.use("/products", require("./routers/products"));
apiRouter.use("/shopping-session", require("./routers/shopping_session"));
apiRouter.use("/user-address", require("./routers/user_address"));
apiRouter.use("/user-payment", require("./routers/user_payment"));
apiRouter.use("/users", require("./routers/users"));

module.exports = apiRouter;
