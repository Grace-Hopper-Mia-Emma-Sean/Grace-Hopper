const { client } = require('../client')

const createProductCategory = async({name, description}) => {
    try {
        const {rows: [category]} = await client.query(`
            INSERT INTO product_category(name, description)
            VALUES($1, $2)
            RETURNING *;
        `, [name, description])
        return category;
    } catch (error){
        throw (error)
    }
}

const getAllProductCategories = async () => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM product_category;
        `)
        return rows;
    } catch (error){
        throw (error)
    }
}

const getCategoryById = async(id) => {
    try {
        const {rows: [category]} = await client.query(`
        SELECT *
        FROM product_category
        WHERE id = ${id};
        `);
        return category
    } catch (error){
        throw (error)
    }
}

const updateCategory = async(id, fields ={}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${ index + 1 }`
    ).join(', ')

    if (setString.length === 0){
        return;
    }
    try {
        const {rows: [product]} = await client.query(`
            UPDATE product_category
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))
        return product;
    } catch (error) {
        throw (error)
    }
}

const deleteProductCategory = async(categoryId)=>{
    try {
        const {rows: [category]} = await client.query(`
            DELETE FROM product_category
            WHERE id=${categoryId}
            RETURNING *;
        `)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    createProductCategory,
    getAllProductCategories,
    getCategoryById,
    updateCategory,
    deleteProductCategory
}