const { client } = require("../client");

const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({
  username,
  password,
  first_name,
  last_name,
  telephone,
  isAdmin,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, first_name, last_name, telephone, "isAdmin")
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
    `,
      [username, hashedPassword, first_name, last_name, telephone, isAdmin]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async ({
  username,
  first_name,
  last_name,
  telephone,
  isAdmin,
}) => {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
      SELECT username, first_name, last_name, telephone, isAdmin
      FROM users
    `,
      [username, first_name, last_name, telephone, isAdmin]
    );
    return users;
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
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.toString.length === 0) return;
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// TODO: Differentiate getUserAcct from getUserOrders or merge?

const getUserAcct = async () => {};

const getUserOrders = async () => {};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
};
