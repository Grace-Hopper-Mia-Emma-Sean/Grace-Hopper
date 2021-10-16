const { client } = require('../client')

const getAllUserPayment = async () => {
    try {
        const { rows } = await client.query(`
            SELECT*
            FROM user_payment;
        `)
        return rows;
    } catch (error) {
        throw error;
    }
}

const getAllUserPaymentById = async (id) =>{
    try {
        const { rows: [userPayment] } = await client.query(`
            SELECT*
            FROM user_payment;
            WHERE id=$1;
        `, [id])
        return userPayment;
    }catch (error) {
        throw error;
    }
}

const createUserPayment = async ({user_id, payment_type, provider, account_no, expiry}) => {
    try {
        const { rows: [userPayment] } = await client.query(`
            INSERT INTO user_payment("user_id", payment_type, provider, account_no, expiry)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `,[user_id, payment_type, provider, account_no, expiry])
        return userPayment;
    }catch (error) {
        throw error;
    }
}

const updateUserPayment = async (fields) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=${index + 1}"`).join(',');
    if (setString.length ===0){
        return ;
    }
    const {id, user_id, payment_type, provider, account_no, expiry } = fields;
    try {
        const { rows: [userPayment] } = await client.query(`
            UPDATE user_payment
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, [id, user_id, payment_type, provider, account_no, expiry])
        return userPayment;
    }catch (error) {
        throw error;
    }
}

const destroyUserPayment = async (id) => {
    try{
        const { rows: [deleteUserPayment] } = await client.query(`
            DELETE FROM user_payment
            WHERE id=$1
            RETURNING *;
        `,[id])
        return deleteUserPayment;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUserPayment, 
    getAllUserPaymentById,
    createUserPayment,
    updateUserPayment,
    destroyUserPayment
}