const { client } = require("../client");

const createOrderDetails = async ({ user_id, total, payment_id }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO order_details_new(user_id, total, payment_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [user_id, total, payment_id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrderDetails = async () => {
  try {
    const { rows } = await client.query(`
            SELECT*
            FROM order_details_new;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllOrderDetailsById = async (id) => {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            SELECT*
            FROM order_details_new
            WHERE order_details.id=$1;
        `,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

async function updateOrderDetails(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            UPDATE order_details_new
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      Object.values(fields)
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
            DELETE FROM order_details_new
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
      DELETE from order_details_new
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
