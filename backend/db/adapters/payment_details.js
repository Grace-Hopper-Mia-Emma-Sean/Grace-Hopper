const { client } = require('../client')

const getAllPaymentDetails = async () => {
    try {
        const { rows } = await client.query(`
            SELECT*
            FROM payment_details;
        `)
        return rows;
    } catch (error) {
        throw error;
    }
}

const getAllPaymentById = async ({id}) => {
    try {
        const { rows: [payment] } = await client.query(`
            SELECT*
            FROM payment_details;
            WHERE "order_id"=$1;
        `, [id])
        return payment;
    }catch (error) {
        throw error;
    }
}

const createPaymentDetails = async ({order_id, amount, provider, status}) => {
    try {
        const { rows: [payment] } = await client.query(`
            INSERT INTO payment_details("order_id", amount, provider, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,[order_id, amount, provider, status])
        return payment;
    }catch (error) {
        throw error;
    }
}

const updatePaymentDetails = async (id,fields={}) =>{
    const setString = Object.keys(fields).map((key, index) => `"${key}"=${index + 1}"`).join(',');
    if (setString.length ===0){
        return ;
    }
    
    try {
        const { rows: [payment] } = await client.query(`
            UPDATE payment_details
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields))
        return payment;
    }catch (error) {
        throw error;
    }
}

const destroyPaymentDetails = async (id) => {
    try{
        const { rows: [deletePaymentDetails] } = await client.query(`
            DELETE FROM payment_details
            WHERE id=$1
            RETURNING *;
        `,[id])
        return deletePaymentDetails;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPaymentById, 
    getAllPaymentDetails,
    createPaymentDetails,
    updatePaymentDetails,
    destroyPaymentDetails
}