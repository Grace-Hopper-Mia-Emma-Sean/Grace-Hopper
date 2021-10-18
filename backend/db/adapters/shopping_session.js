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

const getAllUserShoppingSessions = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM shopping_session
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserShoppingSessionById = async (id) => {
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(
      `
      SELECT *
      FROM shopping_session
      WHERE user_id=$1
    `,
      [id]
    );
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

const updateUserShoppingSession = async (id, fields = {}) => {
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

const deleteUserShoppingSession = async (id) => {
  try {
    const {
      rows: [shoppingSession],
    } = await client.query(
      `
      DELETE FROM shopping_session
      WHERE user_id=$1
      RETURNING *;
    `,
      [id]
    );
    return shoppingSession;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserShoppingSession,
  getAllUserShoppingSessions,
  getUserShoppingSessionById,
  updateUserShoppingSession,
  deleteUserShoppingSession,
};
