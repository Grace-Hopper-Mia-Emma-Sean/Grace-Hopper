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
  getAllUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} = require("./adapters/user_address");

const {
  createUserShoppingSession,
  getAllUserShoppingSessions,
  getUserShoppingSessionById,
  updateUserShoppingSession,
  deleteUserShoppingSession,
} = require("./adapters/shopping_session");

const {
  createUserCartItems,
  getAllUserCartItems,
  getUserCartItemsById,
  updateUserCartItems,
  deleteUserCartItems,
} = require("./adapters/cart_items");

// products adapters
const { createProduct } = require("./adapters/products");
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
  createUserCartItems,
  createUserPayment,
  createUserShoppingSession,
  deleteUser,
  deleteUserAddress,
  deleteUserCartItems,
  deleteUserShoppingSession,
  destroyOrderDetails,
  destroyOrderItems,
  destroyPaymentDetails,
  destroyUserPayment,
  getAllOrderDetails,
  getAllOrderDetailsById,
  getAllOrderItems,
  getAllOrderItemsById,
  getAllPaymentById,
  getAllPaymentDetails,
  getAllUserAddresses,
  getAllUserCartItems,
  getAllUserPayment,
  getAllUserPaymentById,
  getAllUsers,
  getAllUserShoppingSessions,
  getUserById,
  getUserByUsername,
  getUserCartItemsById,
  getUserShoppingSessionById,
  updateOrderDetails,
  updateOrderItems,
  updatePaymentDetails,
  updateUser,
  updateUserAddress,
  updateUserCartItems,
  updateUserPayment,
  updateUserShoppingSession,
};

//TO DO: export all db components here
