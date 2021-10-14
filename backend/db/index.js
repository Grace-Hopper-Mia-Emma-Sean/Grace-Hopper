// user adapters
const { createUser } = require("./adapters/users");
const { createUserAddress } = require("./adapters/user_address");
const { createUserCartItems } = require("./adapters/cart_items");
const { createUserShoppingSession } = require("./adapters/shopping_session");

// products adapters
const { createInitialProducts } = require("./adapters/products");
const {
  createInitialProductCategories,
} = require("./adapters/product_category");
const {
  createInitialProductInventories,
} = require("./adapters/product_inventory");
const {
  createInitialProductDiscounts,
} = require("./adapters/product_discount");

// orders adapters
const { createInitialOrderDetails } = require("./adapters/order_details");
const { createInitialOrderItems } = require("./adapters/order_items");

// payment adapters
const { createInitialUserPayment } = require("./adapters/user_payment");
const { createInitialPaymentDetails } = require("./adapters/payment_details");

module.exports = {
  createUser,
  createUserAddress,
  createUserShoppingSession,
  createUserCartItems,
  createInitialProducts,
  createInitialProductCategories,
  createInitialProductInventories,
  createInitialProductDiscounts,
  createInitialOrderDetails,
  createInitialOrderItems,
  createInitialUserPayment,
  createInitialPaymentDetails,
};

//TO DO: export all db components here
