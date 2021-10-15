const { client } = require("../client");

const createUserShoppingSession = async ({ user_id, total }) => {
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(
      `
      INSERT INTO shopping_session(user_id, total)
      VALUES ($1, $2)
      RETURNING *
    `,
      [user_id, total]
    );
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

const getShoppingSessionById = async (id) => {
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(`
      SELECT *
      FROM shopping_session
      WHERE id=${id}`);
    if (!shoppingSession) return null;
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

const updateShoppingSession = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.toString.length === 0) return;
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(
      `
      UPDATE shopping_session
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

const deleteShoppingSession = async (id) => {
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(`
      DELETE FROM shopping_session
      WHERE id=${id}
      RETURNING *;
    `);
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserShoppingSession,
  getShoppingSessionById,
  updateShoppingSession,
  deleteShoppingSession,
};
