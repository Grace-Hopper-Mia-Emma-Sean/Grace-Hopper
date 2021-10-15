const { client } = require('../client')

const createDiscount = async ({name, description, discount_percent, active}) => {
    try {
        const {rows: [discount]} = await client.query(`
            INSERT INTO product_discount(name, description, discount_percent, active)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, discount_percent, active])
        return discount;
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    createDiscount
}