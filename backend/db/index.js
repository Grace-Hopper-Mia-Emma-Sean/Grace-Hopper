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
  deleteProductsFromCarts,
} = require("./adapters/cart_items");

const {
  createProduct,
  getProductById,
  getAllProducts,
  getProductsByCategoryId,
  updateProduct,
  deleteProduct,
  updateAllProductCategories,
  updateAllProductDiscounts,
} = require("./adapters/products");

const {
  createProductCategory,
  getCategoryById,
  getAllProductCategories,
  createProductCategory,
  deleteProductCategory,
} = require("./adapters/product_category");

const {
  createProductInventory,
  updateProductInventory,
} = require("./adapters/product_inventory");

const {
  createProductDiscount,
  getAllProductDiscounts,
  getProductDiscountById,
  deleteProductDiscount,
} = require("./adapters/product_discount");

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
  canEditOrderItems,
  createCartItems,
  createOrderDetails,
  createOrderItems,
  createPaymentDetails,
  createProduct,
  createProductCategory,
  createProductDiscount,
  createProductInventory,
  createShoppingSession,
  createUser,
  createUserAddress,
  createUserPayment,
  deleteCartItems,
  deleteOrderDetailsByUserId,
  deleteOrderItemsByUserId,
  deleteProduct,
  deleteProductCategory,
  deleteProductDiscount,
  deleteProductsFromCarts,
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
  getProductDiscountById,
  getProductsByCategoryId,
  getShoppingSessionByUserId,
  getUserById,
  getUserByUsername,
  updateAllProductCategories,
  updateAllProductDiscounts,
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
