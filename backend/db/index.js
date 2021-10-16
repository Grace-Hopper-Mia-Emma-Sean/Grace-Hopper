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
const { getAllOrderDetails} = require ("./adapters/order_details")
const { getAllOrderDetailsById } = require ("./adapters/order_details")
const { destroyOrderDetails } = require ("./adapters/order_details")
const { updateOrderDetails} = require ("./adapters/order_details")
const { getAllOrderItems } = require ("./adapters/order_items")
const { getAllOrderItemsById } =require ("./adapters/order_items")
const { updateOrderItems } = require ("./adapters/order_items")
const { destroyOrderItems} = require ("./adapters/order_items")
const { canEditOrderItems} =  require ("./adapters/order_items")

// payment adapters
const { createUserPayment } = require("./adapters/user_payment");
const { createPaymentDetails } = require("./adapters/payment_details");
const { getAllUserPayment } = require("./adapters/user_payment");
const { getAllUserPaymentById } = require("./adapters/user_payment");
const { updateUserPayment } = require("./adapters/user_payment");
const { destroyUserPayment } = require("./adapters/user_payment");
const { getAllPaymentById } = require("./adapters/payment_details");
const { getAllPaymentDetails } = require("./adapters/payment_details");
const { updatePaymentDetails } = require("./adapters/payment_details");
const { destroyPaymentDetails } = require("./adapters/payment_details");

module.exports = {
  getAllPaymentDetails,
  getAllPaymentById,
  updatePaymentDetails,
  destroyPaymentDetails,
  getAllUserPayment,
  getAllUserPaymentById,
  updateUserPayment,
  destroyUserPayment,
  getAllOrderItems,
  getAllOrderItemsById,
  updateOrderItems,
  createOrderItems,
  destroyOrderItems,
  canEditOrderItems,
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
  createUserPayment,
  createPaymentDetails,
};

//TO DO: export all db components here
