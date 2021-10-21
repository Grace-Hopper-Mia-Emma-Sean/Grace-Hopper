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
const {
  createProduct,
  getAllProductCategories,
  getProductById,
  getAllProducts,
  getProductsByCategoryId,
  updateProduct,
  deleteProduct,
} = require("./adapters/products");

const {
  createProductCategory,
  getCategoryById,
} = require("./adapters/product_category");

const {
  createProductInventory,
  updateProductInventory,
} = require("./adapters/product_inventory");

const {
  createProductDiscount,
  getAllProductDiscounts,
} = require("./adapters/product_discount");

// orders adapters
const {
  getAllOrderDetails,
  getAllOrderDetailsById,
  createOrderDetails,
  updateOrderDetails,
  destroyOrderDetails,
  deleteOrderDetailsByUserId,
} = require("./adapters/order_details");

const {
  getAllOrderItems,
  getAllOrderItemsById,
  createOrderItems,
  updateOrderItems,
  destroyOrderItems,
  canEditOrderItems,
  deleteOrderItemsByUserId,
} = require("./adapters/order_items");

// payment adapters

const {
  getAllUserPayment,
  getAllUserPaymentById,
  createUserPayment,
  updateUserPayment,
  destroyUserPayment,
} = require("./adapters/user_payment");

const {
  getAllPaymentById,
  getAllPaymentDetails,
  createPaymentDetails,
  updatePaymentDetails,
  destroyPaymentDetails,
} = require("./adapters/payment_details");

module.exports = {
  createProductInventory,
  createShoppingSession,
  createUser,
  createUserAddress,
  createUserPayment,
  deleteCartItems,
  deleteOrderDetailsByUserId,
  deleteOrderItemsByUserId,
  deleteProduct,
  deleteShoppingSession,
  deleteUser,
  deleteUserAddress,
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
  getAllProductCategories,
  getAllProductDiscounts,
  getAllProducts,
  getAllShoppingSessions,
  getAllUserAddresses,
  getAllUserPayment,
  getAllUserPaymentById,
  getAllUsers,
  getCartItems,
  getCartItemsByUserId,
  getCategoryById,
  getProductById,
  getProductsByCategoryId,
  getShoppingSessionByUserId,
  getUserById,
  getUserByUsername,
  updateCartItems,
  updateOrderDetails,
  updateOrderItems,
  updatePaymentDetails,
  updateProduct,
  updateProductInventory,
  updateShoppingSession,
  updateUser,
  updateUserAddress,
  updateUserPayment,
};

//TO DO: export all db components here
