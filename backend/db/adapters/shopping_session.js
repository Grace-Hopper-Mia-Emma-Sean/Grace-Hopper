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

module.exports = { createUserShoppingSession };
