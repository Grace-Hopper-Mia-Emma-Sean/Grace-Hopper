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
  email,
  isAdmin,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, first_name, last_name, telephone, email, "isAdmin")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *
    `,
      [
        username,
        hashedPassword,
        first_name,
        last_name,
        telephone,
        email,
        isAdmin,
      ]
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
      SELECT username, first_name, last_name, telephone, email, "isAdmin"
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
      SELECT username, first_name, last_name, telephone, email, "isAdmin"
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
  // This function returns a user's PW, so we're only using it for for register (check if username exists) and login (check if PW is right), and then the PW is deleted before res.send
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
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  if (setString.length === 0) return;
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *
      `,
      Object.values(fields)
    );
    return user;
  } catch (error) {
    console.error(error);
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
      WHERE id=${id}
      RETURNING *;
    `
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
