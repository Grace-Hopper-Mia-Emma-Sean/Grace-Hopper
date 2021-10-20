const { client } = require("../client");

const createShoppingSession = async ({ user_id, total }) => {
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

const getAllShoppingSessions = async () => {
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

const getShoppingSessionByUserId = async (id) => {
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

const updateShoppingSession = async (id, fields = {}) => {
  // console.log(`id: ${id}`, `fields: ${fields}`);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  // console.log(setString);
  if (setString.length === 0) return;
  try {
    const {
      rows: [session],
    } = await client.query(
      `
        UPDATE shopping_session
        SET ${setString}
        WHERE id=${id}
        RETURNING *
      `,
      Object.values(fields)
    );
    // console.log(session);
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteShoppingSession = async (id) => {
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
  createShoppingSession,
  getAllShoppingSessions,
  getShoppingSessionByUserId,
  updateShoppingSession,
  deleteShoppingSession,
};
