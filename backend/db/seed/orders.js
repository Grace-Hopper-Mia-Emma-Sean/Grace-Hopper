const { createOrderDetails } = require("../adapters/order_details");

const { createOrderItems } = require("../adapters/order_items");

const createInitialOrderDetails = async () => {
  console.log("Starting to create order details...");
  try {
    const orderDetailsToCreate = [
<<<<<<< HEAD
      { user_id: "1", total: 123.2, payment_id: "1" },
      { user_id: "4", total: 69.69, payment_id: "2" },
      { user_id: "6", total: 98.76, payment_id: "3" },
      { user_id: "8", total: 50.0, payment_id: "4" },
      { user_id: "7", total: 33.33, payment_id: "5" },
      { user_id: "4", total: 87.65, payment_id: "6" },
=======
      { user_id: 1, total: 123.2, payment_id: 1 },
      { user_id: 1, total: 69.69, payment_id: 1 },
      { user_id: 1, total: 98.76, payment_id: 1 },
      { user_id: 5, total: 50.0, payment_id: 5 },
      { user_id: 4, total: 33.33, payment_id: 4 },
      { user_id: 3, total: 87.65, payment_id: 3 },
>>>>>>> e0484b47a0e6dd64607a7fd0c1ac7e8c8d5faeb1
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
<<<<<<< HEAD
      { order_id: "5", product_id: "2", quantity: 4 },
      { order_id: "4", product_id: "2", quantity: 3 },
      { order_id: "9", product_id: "3", quantity: 1 },
      { order_id: "10", product_id: "8", quantity: 1 },
      { order_id: "11", product_id: "10", quantity: 2 },
    ];
    const orderItems = await Promise.all(orderItemsToCreate.map(createOrderItems));
    console.log('Order itmes created:')
    console.log(orderItems)
    console.log('Finished creating order items!')
    
=======
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
>>>>>>> e0484b47a0e6dd64607a7fd0c1ac7e8c8d5faeb1
  } catch (error) {
    console.error("Error creating order items!");
    throw error;
  }
};

module.exports = { createInitialOrderDetails, createInitialOrderItems };
