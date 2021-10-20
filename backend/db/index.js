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
  getAddressByUserId,
  getAllUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} = require("./adapters/user_address");

const {
  createShoppingSession,
  getAllShoppingSessions,
  getShoppingSessionByUserId,
  updateShoppingSession,
  deleteShoppingSession,
} = require("./adapters/shopping_session");

const {
  createCartItems,
  getCartItems,
  getCartItemsByUserId,
  updateCartItems,
  deleteCartItems,
} = require("./adapters/cart_items");

// products adapters
const { createProduct, getProductById } = require("./adapters/products");
const { createProductCategory } = require("./adapters/product_category");
const { createProductInventory } = require("./adapters/product_inventory");
const { createProductDiscount } = require("./adapters/product_discount");

// orders adapters
const {
  createOrderDetails,
  getAllOrderDetailsById,
  getAllOrderDetails,
  updateOrderDetails,
  destroyOrderDetails,
} = require("./adapters/order_details");

const {
  createOrderItems,
  getAllOrderItems,
  getAllOrderItemsById,
  updateOrderItems,
  destroyOrderItems,
  canEditOrderItems,
} = require("./adapters/order_items");

// payment adapters

const {
  createUserPayment,
  getAllUserPayment,
  getAllUserPaymentById,
  updateUserPayment,
  destroyUserPayment,
} = require("./adapters/user_payment");

const {
  createPaymentDetails,
  getAllPaymentById,
  getAllPaymentDetails,
  updatePaymentDetails,
  destroyPaymentDetails,
} = require("./adapters/payment_details");

module.exports = {
  canEditOrderItems,
  createOrderDetails,
  createOrderItems,
  createPaymentDetails,
  createProduct,
  createProductCategory,
  createProductDiscount,
  createProductInventory,
  createUser,
  createUserAddress,
  createCartItems,
  createUserPayment,
  createShoppingSession,
  deleteUser,
  deleteUserAddress,
  deleteCartItems,
  deleteShoppingSession,
  destroyOrderDetails,
  destroyOrderItems,
  destroyPaymentDetails,
  destroyUserPayment,
  getAddressByUserId,
  getAllOrderDetails,
  getAllOrderDetailsById,
  getAllOrderItems,
  getAllOrderItemsById,
  getAllPaymentById,
  getAllPaymentDetails,
  getAllUserAddresses,
  getCartItems,
  getAllUserPayment,
  getAllUserPaymentById,
  getAllUsers,
  getAllShoppingSessions,
  getUserById,
  getUserByUsername,
  getCartItemsByUserId,
  getProductById,
  getShoppingSessionByUserId,
  updateOrderDetails,
  updateOrderItems,
  updatePaymentDetails,
  updateUser,
  updateUserAddress,
  updateCartItems,
  updateUserPayment,
  updateShoppingSession,
};

//TO DO: export all db components here
