const { client } = require("../client");

const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const { userLogin, dbFields } = require("../../api/utils");

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

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
      SELECT username, first_name, last_name, telephone, "isAdmin"
      FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT username, first_name, last_name, telephone, "isAdmin"
      FROM users
      WHERE id=$1`,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  // only used for login/register
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
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=${index + 1}"`)
    .join(",");
  if (setString.length === 0) return;
  // const { id, username, first_name, last_name, telephone, isAdmin } = fields;
  try {
    const {
      rows: [payment],
    } = await client.query(
      `
        UPDATE payment_details
        SET ${setString}
        WHERE id=${id}
        RETURNING *
        `,
      // [id, username, first_name, last_name, telephone, isAdmin]
      Object.values(fields)
    );
    return payment;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
