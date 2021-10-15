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

module.exports = {
    createProductCategory
}