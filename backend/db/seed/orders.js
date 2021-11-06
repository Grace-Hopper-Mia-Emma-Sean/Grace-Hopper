const { createOrderDetails } = require("../adapters/order_details");

const { createOrderItems } = require("../adapters/order_items");

const createInitialOrderDetails = async () => {
  console.log("Starting to create order details...");
  try {
    const orderDetailsToCreate = [
      { user_id: 9, total: 123.2, payment_id: 10 },
      { user_id: 10, total: 69.69, payment_id: 11 },
      { user_id: 9, total: 98.76, payment_id: 12 },
      { user_id: 10, total: 50.00, payment_id: 51 },
      { user_id: 9, total: 33.33, payment_id: 41 },
      { user_id: 10, total: 87.65, payment_id: 31 },
    ];
    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(createOrderDetails)
    );
    console.log("Order details created:");
    console.log(orderDetails);
    console.log("Finished creating order details!");
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
      { order_id: 4, product_id: 3, quantity: 1 },
      { order_id: 2, product_id: 8, quantity: 1 },
      { order_id: 4, product_id: 10, quantity: 2 },
    ];
    const orderItems = await Promise.all(
      orderItemsToCreate.map(createOrderItems)
    );
    console.log("Order items created:");
    console.log(orderItems);
    console.log("Finished creating order items!");
  } catch (error) {
    console.error("Error creating order items!");
    throw error;
  }
};

module.exports = { createInitialOrderDetails, createInitialOrderItems };
