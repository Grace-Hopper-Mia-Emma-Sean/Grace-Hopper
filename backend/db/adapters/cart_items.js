const { client } = require("../client");

const createCartItems = async ({ session_id, product_id, quantity }) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      INSERT INTO cart_items(session_id, product_id, quantity, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [session_id, product_id, quantity]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const getCartItems = async () => {
  try {
    const { rows } = await client.query(`
      SELECT user_id, name, cart_items.quantity, price, cart_items.quantity*price AS total
      FROM cart_items
      LEFT JOIN products
      ON cart_items.product_id = products.id;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCartItemsByUserId = async (id) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      SELECT user_id, name, cart_items.quantity, price, cart_items.quantity*price AS total
      FROM cart_items
      LEFT JOIN products
      ON cart_items.product_id = products.id
      WHERE user_id=$1
    `,
      [id]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const updateCartItems = async (id, fields) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      UPDATE cart_items
      SET quantity = ${fields}
      WHERE user_id=${id}
      RETURNING *
    `
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const deleteCartItems = async (id) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      DELETE FROM cart_items
      WHERE user_id=${id}
      RETURNING *;
    `
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const deleteProductsFromCarts = async (productId) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(`
      DELETE FROM cart_items
      WHERE product_id=${productId}
      RETURNING *;
    `);
    return cartItems;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCartItems,
  getCartItems,
  getCartItemsByUserId,
  updateCartItems,
  deleteCartItems,
  deleteProductsFromCarts,
};
