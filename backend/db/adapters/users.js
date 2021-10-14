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

const createUserAddress = async ({
  user_id,
  address_line1,
  address_line2,
  city,
  state,
  postal_code,
  country,
  telephone,
  mobile,
}) => {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
      INSERT INTO user_address(user_id, address_line1, address_line2, city, state, postal_code, country, telephone, mobile)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        user_id,
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
        telephone,
        mobile,
      ]
    );
    return address;
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
  createUserAddress,
  getUser,
  getUserById,
  getUsers,
  getUserAcct,
  getUserOrders,
};
