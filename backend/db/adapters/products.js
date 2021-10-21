const { client } = require('../client')

const createProduct = async({name, description, SKU, category_id, price, discount_id, quantity}) => {
    try {
        const {rows: [product]} = await client.query(`
            INSERT INTO products( name, description, SKU, "category_id", price, discount_id, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [name, description, SKU, category_id, price, discount_id, quantity])
        return product;
    } catch (error){
        throw (error)
    }
}

const getProductById = async(id) => {
    try {
        const {rows: [product]} = await client.query(`
            SELECT *
            FROM products
            WHERE id=${id};
        `);
        return product
    } catch (error){
        throw (error)
    }
}

const getAllProducts = async() => {
    try {
        const { rows } = await client.query(`
            SELECT *
            from products;
        `);
        return rows;
    } catch (error) {
        throw (error)
    }
}

const getProductsByCategoryId = async(categoryId) => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM products
            WHERE "category_id"=${categoryId};
        `);
        return rows;
    } catch (error) {
        throw (error);
    }
}

const updateProduct = async(id, fields ={}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ')

    if (setString.length === 0){
        return;
    }
    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))
        return product;
    } catch (error) {
        throw (error)
    }
}

const updateAllProductDiscounts = async(discountId) => {
    try {
        const {rows} = await client.query(`
            UPDATE products
            SET discount_id=4
            WHERE discount_id=${discountId}
        `)
        return rows
    } catch (error){
        throw error
    }
}

const updateAllProductCategories = async(categoryId) => {
    try {
        const {rows} = await client.query(`
            UPDATE products
            SET category_id=4
            WHERE category_id=${categoryId}
        `)
        return rows;
    } catch (error){
        throw error
    }
}

const deleteProduct = async (id) => {
    try {
        const {rows: [product]} = await client.query(`
            DELETE FROM products
            WHERE id=${id}
            RETURNING *;
           `)
       
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    getProductsByCategoryId,
    updateProduct,
    updateAllProductDiscounts,
    updateAllProductCategories,
    deleteProduct
}