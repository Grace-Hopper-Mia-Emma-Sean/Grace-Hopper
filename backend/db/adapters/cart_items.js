const { client } = require("../client");

const createCartItems = async ({ session_id, product_id, quantity }) => {
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

const getCartItems = async () => {
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

const getCartItemsByUserId = async (id) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
      SELECT user_id, session_id, product_id, quantity
      FROM cart_items
      INNER JOIN shopping_session
      ON cart_items.session_id = shopping_session.id
      LEFT JOIN users
      ON users.id = shopping_session.user_id
      WHERE users.id=$1
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
      FROM shopping_session
      WHERE cart_items.session_id = shopping_session.id
      AND shopping_session.user_id = ${id}
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
      USING shopping_session
      WHERE shopping_session.id = cart_items.session_id
      AND shopping_session.user_id=${id}
      RETURNING *;
    `
    );
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
};
