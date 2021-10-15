const { client } = require("../client");

const createUserCartItems = async ({ session_id, product_id, quantity }) => {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      INSERT INTO cart_items("session_id", "product_id", quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [session_id, product_id, quantity]
    );
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const getCartItemById = async (id) => {
  try {
    const {
      rows: [cartItem],
    } = await client.query(`
      SELECT *
      FROM cart_items
      WHERE id=${id}`);
    if (!cartItem) return null;
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const updateCartItems = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.toString.length === 0) return;
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
      UPDATE cart_items
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const deleteCartItems = async (id) => {
  try {
    const {
      rows: [cartItem],
    } = await client.query(`
      DELETE FROM cart_items
      WHERE id=${id}
      RETURNING *;
    `);
    return cartItem;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserCartItems,
  getCartItemById,
  updateCartItems,
  deleteCartItems,
};
