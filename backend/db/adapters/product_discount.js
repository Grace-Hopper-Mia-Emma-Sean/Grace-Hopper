const { client } = require("../client");

const createProductDiscount = async ({
  name,
  description,
  discount_percent,
  active,
}) => {
  try {
    const {
      rows: [discount],
    } = await client.query(
      `
            INSERT INTO product_discount(name, description, discount_percent, active)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
      [name, description, discount_percent, active]
    );
    return discount;
  } catch (error) {
    throw error;
  }
};

const getAllProductDiscounts = async () => {
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM product_discount;
    `)
    return rows;
  } catch (error) {
    throw (error)
  }
}

const getProductDiscountById = async (discountId) => {
  try {
    const {rows: [discount]} = await client.query(`
      SELECT *
      FROM product_discount
      WHERE id=${discountId}
    `)
  return discount
  } catch (error){
    throw error
  }
}

const updateProductDiscount = async (id, fields={}) => {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ')
  if (setString.length === 0){
      return;
  }
  try {
      const {rows: [discount]} = await client.query(`
          UPDATE product_discount
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
      `, Object.values(fields))
      return discount;
  } catch (error) {
      throw (error)
  }
}

const deleteProductDiscount = async (discountId) => {
  try {
    const {rows: [discount]} = await client.query(`
    DELETE FROM product_discount
    WHERE id=${discountId}
    RETURNING *
  `)
  } catch (error) {
    throw (error)
  }
}

module.exports = {
  createProductDiscount,
  getAllProductDiscounts,
  getProductDiscountById,
  updateProductDiscount,
  deleteProductDiscount
};
