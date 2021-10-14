const { client } = require("../client");

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
    `,
      [username, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM USERS
      WHERE id=${id}`);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// TODO: Differentiate getUserAcct from getUserOrders or merge?

const getUserAcct = async () => {};

const getUserOrders = async () => {};

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUsers,
  getUserAcct,
  getUserOrders,
};
