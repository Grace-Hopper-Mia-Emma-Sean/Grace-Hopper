const { client } = require("../client");

const createPaymentDetails = async ({ order_id, amount, provider, status }) => {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO payment_details(order_id, amount, provider, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
      [order_id, amount, provider, status]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

async function getAllPaymentDetails() {
  try {
    const { rows } = await client.query(`
            SELECT*
            FROM payment_details;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPaymentById(id) {
  try {
    const {
      rows: [payment]
    } = await client.query(
      `
            SELECT*
            FROM payment_details
            WHERE payment_details.id=$1;
        `,
      [id]
    );
    return payment;
  } catch (error) {
    throw error;
  }
}

async function updatePaymentDetails(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [payment]
    } = await client.query(
      `
            UPDATE payment_details
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
        Object.values(fields)
    );
    return payment;
  } catch (error) {
    throw error;
  }
}

async function destroyPaymentDetails(id) {
  try {
    const {
      rows: [deletePaymentDetails],
    } = await client.query(
      `
            DELETE FROM payment_details
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return deletePaymentDetails;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllPaymentById,
  getAllPaymentDetails,
  createPaymentDetails,
  updatePaymentDetails,
  destroyPaymentDetails,
};
