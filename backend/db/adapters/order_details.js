const { client } = require("../client");

const createOrderDetails = async ({ user_id, payment_id, total }) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
        INSERT INTO order_details("user_id", "payment_id",total)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [user_id, payment_id, total]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

const getAllOrderDetails = async () => {
  try {
    const { rows } = await client.query(`
            SELECT*
            FROM order_details;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllOrderDetailsById = async ({ id }) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            SELECT*
            FROM order_details;
            WHERE "user_id"=$1;
        `,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

async function updateOrderDetails(fields) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=${index + 1}"`)
    .join(",");
  if (setString.length === 0) {
    return;
  }
  const { id, user_id, total, payment_id } = fields;
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            UPDATE order_details
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      [id, user_id, total, payment_id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderDetails(id) {
  try {
    const {
      rows: [deleteOrderDetails],
    } = await client.query(
      `
            DELETE FROM order_details
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return deleteOrderDetails;
  } catch (error) {
    throw error;
  }
}

const deleteOrderDetailsByUserId = async (id) => {
  // diff than above; don't delete, please; used in deleting users
  try {
    const {
      rows: [orderDetails],
    } = await client.query(`
      DELETE from order_details
      WHERE user_id=${id}
    `);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrderDetails,
  getAllOrderDetailsById,
  createOrderDetails,
  updateOrderDetails,
  destroyOrderDetails,
  deleteOrderDetailsByUserId,
};
