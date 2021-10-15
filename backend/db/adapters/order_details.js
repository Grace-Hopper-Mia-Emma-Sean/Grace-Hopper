const { client } = require('../client')

const getAllOrderDetails = async () =>{
    try {
        const { rows } = await client.query(`
            SELECT*
            FROM order_details;
        `)
        return rows;
    } catch (error) {
        throw error;
    }
}

const getAllOrderDetailsById = async ({id}) => {
    try {
        const { rows: [orders] } = await client.query(`
            SELECT*
            FROM order_details;
            WHERE "user_id"=$1;
        `, [id])
        return orders;
    }catch (error) {
        throw error;
    }
}

async function createOrderDetails({user_id, payment_id, total}) {
    try {
        const { rows: [orders] } = await client.query(`
            INSERT INTO order_details("user_id", "payment_id", total)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[user_id, payment_id, total])
        return orders;
    }catch (error) {
        throw error;
    }
}

async function updateOrderDetails(fields) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=${index + 1}"`).join(',');
    if (setString.length ===0){
        return ;
    }
    const {total} = fields;
    try {
        const { rows: [orders] } = await client.query(`
            UPDATE order_details
            SET ${setString}
            WHERE total=${total}
            RETURNING *;
        `, Object.values(fields))
        return orders;
    }catch (error) {
        throw error;
    }
}

async function destroyOrderDetails(id) {
    try{
        const { rows: [deleteOrderDetails] } = await client.query(`
            DELETE FROM order_details
            WHERE id=$1
            RETURNING *;
        `,[id])
        return deleteOrderDetails;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    getAllOrderDetails, 
    getAllOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    destroyOrderDetails
}