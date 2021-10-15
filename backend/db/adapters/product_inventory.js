const { client } = require("../client");

const createProductInventory = async ({ quantity }) => {
  try {
    const {
      rows: [productInventory],
    } = await client.query(
      ` INSERT INTO product_inventory(quantity)
        VALUES ($1)
        RETURNING *;
        `,
      [quantity]
    );
    return productInventory;
  } catch (error) {
    throw error;
  }
};

const updateProductInventory = async (id, quantity) => {
  try {
    const {
      rows: [updatedInventory],
    } = await client.query(`
            UPDATE product_inventory
            SET quantity=${quantity}
            WHERE id=${id}
        `);
    return updatedInventory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProductInventory,
  updateProductInventory,
};
