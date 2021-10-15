const { client } = require('../client')

const updateProductInventory = async(id, quantity) => {
    try {
        const {rows: [updatedInventory]} = await client.query(`
            UPDATE product_inventory
            SET quantity=${quantity}
            WHERE id=${id}
        `)
        return updatedInventory;
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    updateProductInventory
}