const express = require("express");
const paymentDetailsRouter = express.Router();

const { 
    getAllPaymentDetails,
    createPaymentDetails,
    getAllPaymentById,
    updatePaymentDetails,
    destroyPaymentDetails,
} = require ('../../db');


const {userLoggedIn} = require('../utils')

paymentDetailsRouter.post("/", async (req, res, next) => {
    const {order_id, amount, provider, status} = req.body
    try{
        const createdPaymentDetails = await createPaymentDetails({order_id, amount, provider, status})
            res.send(createdPaymentDetails)
    }catch (error) {
        next (error )
    }
})

paymentDetailsRouter.get("/", async (req, res, next) => {
    try {
        const allPaymentDetails =  await getAllPaymentDetails();
        res.send(allPaymentDetails)
    } catch (error) {
        next (error)
    }
})

paymentDetailsRouter.patch('/:paymentDetailsId', async (req, res, next) => {
    const { order_id, amount, provider, status } = req.body;
    const { paymentDetailsId } = req.params;
    const updateFields = {id: paymentDetailsId, order_id, amount, provider, status}
    
    try {
        const getPaymentDetails =  await getAllPaymentById(paymentDetailsId)
        if (!getPaymentDetails) {
            res.status(401)
            next({
                name: "NoOrderItemsError",
                message: "No oder item exist to update"
            })
        } else {
                console.log("Get Order Items to Update:", getPaymentDetails)
                const updatedPaymentDetails= await updatePaymentDetails(paymentDetailsId, updateFields)
                console.log("Updated Order Items:", updatedPaymentDetails)
                res.send(updatedPaymentDetails)
            }
        } catch (error){
            next (error)
        }
})


paymentDetailsRouter.delete('/:paymendDetailsId', async (req, res, next) => {
    const { paymendDetailsId } = req.params;
    try {
        const deletePaymentDetails = await destroyPaymentDetails(paymendDetailsId)
        res.send(deletePaymentDetails)
            
        } catch ({name, message}){
            next ({name, message})
        }
})

module.exports = paymentDetailsRouter;
