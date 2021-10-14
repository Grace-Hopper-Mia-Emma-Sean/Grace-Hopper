const client = require ('../client');

async function getAllOrderItems () {
    try {
        const { rows } = await client.query(`
            SELECT*
            FROM order_items;
        `)
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getAllOrderItemsById(id) {
    try {
        const { rows: [orders] } = await client.query(`
            SELECT*
            FROM order_items;
            WHERE id=$1;
        `, [id])
        return orders;
    }catch (error) {
        throw error;
    }
}

async function createOrderItems({orderId, productId, quantity}) {
    try {
        const { rows: [orders] } = await client.query(`
            INSERT INTO order_items("orderId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `[orderId, productId, quantity])
        return orders;
    }catch (error) {
        throw error;
    }
}

async function updateOrderItems(fields) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=${index + 1}"`).join(',');
    if (setString.length ===0){
        return ;
    }
    const {quantity} = fields;
    try {
        const { rows: [orders] } = await client.query(`
            UPDATE order_items
            SET ${setString}
            WHERE quantity=${quantity}
            RETURNING *;
        `, Object.values(fields))
        return orders;
    }catch (error) {
        throw error;
    }
}

async function destroyOrderItems(id) {
    try{
        const { rows: [deleteOrderItems] } = await client.query(`
            DELETE FROM order_items
            WHERE id=$1
            RETURNING *;
        `,[id])
        return deleteOrderItems;
    }catch (error) {
        throw error;
    }
}

module.export = {
    getAllOrderItems, 
    getAllOrderItemsById,
    createOrderItems,
    updateOrderItems,
    destroyOrderItems
}