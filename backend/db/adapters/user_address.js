const { client } = require("../client");

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

const getUserAddressById = async (id) => {
  try {
    const {
      rows: [address],
    } = await client.query(`
      SELECT *
      FROM USERS
      WHERE id=${id}`);
    if (!address) return null;
    return address;
  } catch (error) {
    throw error;
  }
};

const updateUserAddress = async ({ id, fields = {} }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.toString.length === 0) return;
  try {
    const {
      rows: [address],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUserAddress, getUserAddressById, updateUserAddress };
