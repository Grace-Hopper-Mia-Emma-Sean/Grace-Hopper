const { client } = require("../client");

const createUserCartItems = async ({ session_id, product_id, quantity }) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      INSERT INTO cart_items(session_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [session_id, product_id, quantity]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const getAllUserCartItems = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM cart_items
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserCartItemsById = async (id) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      SELECT *
      FROM cart_items
      WHERE user_id=$1
    `,
      [id]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const updateUserCartItems = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.toString.length === 0) return;
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      UPDATE cart_items
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const deleteUserCartItems = async (id) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      DELETE FROM cart_items
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const deleteProductsFromCarts = async (productId) => {
  try {
    const {rows: [cartItems]} = await client.query(`
      DELETE FROM cart_items
      WHERE product_id=${productId}
      RETURNING *;
    `)
    return cartItems
  } catch (error){
    throw error;
  }
}

module.exports = {
  createUserCartItems,
  getAllUserCartItems,
  getUserCartItemsById,
  updateUserCartItems,
  deleteUserCartItems,
  deleteProductsFromCarts
};
