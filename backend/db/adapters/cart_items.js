const { client } = require("../client");

const createUserCartItems = async ({ session_id, product_id, quantity }) => {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO cart_items(session_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [session_id, product_id, quantity]
    );
    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUserCartItems };
