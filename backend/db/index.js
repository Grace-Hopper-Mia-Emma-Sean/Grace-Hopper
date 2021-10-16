// user adapters
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("./adapters/users");

const {
  createUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("./adapters/user_address");

const {
  createUserCartItem,
  getCartItemById,
  updateCartItems,
  deleteCartItems,
} = require("./adapters/cart_items");

const {
  createUserShoppingSession,
  getShoppingSessionById,
  updateShoppingSession,
  deleteShoppingSession,
} = require("./adapters/shopping_session");

// products adapters
const { createProduct } = require("./adapters/products");
const { createProductCategory } = require("./adapters/product_category");
const { createProductInventory } = require("./adapters/product_inventory");
const { createProductDiscount } = require("./adapters/product_discount");

// orders adapters
const { createOrderDetails } = require("./adapters/order_details");
const { createOrderItems } = require("./adapters/order_items");
const {getAllOrderDetails} = require ("./adapters/order_details.js")
const { getAllOrderDetailsById } = require ("./adapters/order_details.js")
const { destroyOrderDetails } = require ("./adapters/order_details.js")
const {updateOrderDetails} = require ("./adapters/order_details.js")

// payment adapters
const { createUserPayment } = require("./adapters/user_payment");
const { createPaymentDetails } = require("./adapters/payment_details");

module.exports = {
  destroyOrderDetails,
  getAllOrderDetails,
  getAllOrderDetailsById,
  updateOrderDetails,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  createUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
  createUserShoppingSession,
  getShoppingSessionById,
  updateShoppingSession,
  deleteShoppingSession,
  createUserCartItem,
  getCartItemById,
  updateCartItems,
  deleteCartItems,
  createProduct,
  createProductCategory,
  createProductInventory,
  createProductDiscount,
  createOrderDetails,
  createOrderItems,
  createUserPayment,
  createPaymentDetails,
};

//TO DO: export all db components here
