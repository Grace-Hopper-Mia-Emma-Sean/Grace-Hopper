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

const getAllUserAddresses = async () => {
  try {
    // ? This doesn't work if I do `address` instead of `rows`... it sends back an empty 200
    const { rows } = await client.query(`
      SELECT *
      FROM user_address
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAddressByUserId = async (id) => {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
      SELECT *
      FROM user_address
      WHERE id=$1`,
      [id]
    );
    return address;
  } catch (error) {
    throw error;
  }
};

const updateUserAddress = async (id, fields = {}) => {
  console.log(`id: ${id}`, `fields: ${fields}`);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  console.log(setString);
  if (setString.length === 0) return;
  try {
    const {
      rows: [address],
    } = await client.query(
      `
        UPDATE user_address
        SET ${setString}
        WHERE id=${id}
        RETURNING *
      `,
      Object.values(fields)
    );
    console.log(address);
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUserAddress = async (id) => {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
      DELETE FROM user_address
      WHERE user_id=$1
      RETURNING *;
    `,
      [id]
    );
    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUserAddress,
  getAddressByUserId,
  getAllUserAddresses,
  updateUserAddress,
  deleteUserAddress,
};
