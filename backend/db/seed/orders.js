const {
  createOrderDetails,

} = require("..")

const createInitialOrderDetails = async () => {
  console.log("Starting to create order details...");
  try {
    const orderDetailsToCreate = [
      { user_id: 1, total: 123.2, payment_id: 1 },
      { user_id: 4, total: 69.69, payment_id: 2 },
      { user_id: 6, total: 98.76, payment_id: 3 },
      { user_id: 8, total: 50.0, payment_id: 4 },
      { user_id: 7, total: 33.33, payment_id: 5 },
      { user_id: 4, total: 87.65, payment_id: 6 },
    ];
    const orderDetails = await Promise.all(orderDetailsToCreate.map(createOrderDetails));
    console.log('Order details created:')
    console.log(orderDetails)
    console.log('Finished creating order details!')
  } catch (error) {
    console.error("Error creating order details!");
    throw error;
  }
};

const createInitialOrderItems = async () => {
  console.log("Starting to create order items...");
  try {
    const orderItemsToCreate = [
      { order_id: 5, product_id: 2, quantity: 4 },
      { order_id: 4, product_id: 2, quantity: 3 },
      { order_id: 9, product_id: 3, quantity: 1 },
      { order_id: 10, product_id: 8, quantity: 1 },
      { order_id: 11, product_id: 10, quantity: 2 },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating order items!");
    throw error;
  }
};

module.exports = { createInitialOrderDetails, createInitialOrderItems };
