const { client } = require("../client");

const createOrderItems = async ({ order_id, product_id, quantity }) => {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO order_items(order_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
      [order_id, product_id, quantity]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

async function getAllOrderItems() {
  try {
    const { rows } = await client.query(`
            SELECT*
            FROM order_items;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllOrderItemsById(id) {
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            SELECT*
            FROM order_items
            JOIN products ON order_items.product_id=products.id
            JOIN order_details ON order_items.order_id=order_details.id
            WHERE order_items.id=$1;
        `,
      [id]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItems(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");
  if (setString.length === 0) {
    return;
  }

  const { order_id, product_id, quantity } = fields;
  try {
    const {
      rows: [orders],
    } = await client.query(
      `
            UPDATE order_items
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      [id, order_id, product_id, quantity]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function destroyOrderItems(id) {
  try {
    const {
      rows: [deleteOrderItems],
    } = await client.query(
      `
            DELETE FROM order_items
            WHERE id=$1
            RETURNING *;
        `,
      [id]
    );
    return deleteOrderItems;
  } catch (error) {
    throw error;
  }
}

const deleteOrderItemsByUserId = async (id) => {
  // diff than above; don't delete, please; used in deleting users
  try {
    const {
      rows: [orderItems],
    } = await client.query(`
      DELETE from order_items
      USING order_details
      WHERE order_details.id = order_items.order_id
      AND order_details.user_id=${id}
    `);
    return orderItems;
  } catch (error) {
    throw error;
  }
};

async function canEditOrderItems(order_id, product_id) {
  const {rows } = await client.query(
    `
    SELECT* FROM order_items
    JOIN order_details ON order_items."order_id"=order_details.id
    JOIN products ON order_items."product_id"=products.id
    AND order_items.order_id = $1, order_items.product_id =$2
  `,
    [order_id, product_id]
  );
  return rows;
}

module.exports = {
  getAllOrderItems,
  getAllOrderItemsById,
  createOrderItems,
  updateOrderItems,
  destroyOrderItems,
  canEditOrderItems,
  deleteOrderItemsByUserId,
};
