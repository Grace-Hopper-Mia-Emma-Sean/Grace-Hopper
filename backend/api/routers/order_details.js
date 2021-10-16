const express = require("express");
const orderDetailsRouter = express.Router();

const {   
    getAllOrderDetailsById,
    destroyOrderDetails,
    updateOrderDetails,
    getAllOrderDetails,
    createOrderDetails

} = require ('../../db')

const {userLoggedIn, requiredNotSent} = require('./utils')

orderDetailsRouter.post("/", async (req, res, next) => {
    const userId= req.user.id;
    const paymentId = req.payment_details.id
    const { total } = req.body
    try{
        const createOrderDetails = await createOrderDetails({user_id: userId, payment_id:paymentId, total})
            res.send(createOrderDetails)
    }catch (error) {
        next (error )
    }
})

orderDetailsRouter.get("/", async (req, res, next) => {
    try {
        const allOrderDetails =  await getAllOrderDetails();
        res.send(allOrderDetails)
    } catch (error) {
        next (error)
    }
})
orderDetailsRouter.patch('/:orderDetailsId', userLoggedIn, requiredNotSent({requiredParams: ["id", "user_id", "total", "payment_id"], atLeastOne: true}), async (req, res, next) => {
    const { total } = req.body;
    const { orderDetailsId } = req.params;
    const userId = req.user.id;
    const paymentId = req.payment_details.id;

    const updateFields = {id: orderDetailsId, user_id: userId, total, payment_id:paymentId}
    
    try {
        const getOrderDetails =  await getAllOrderDetailsById(orderDetailsId)
        if (!getOrderDetails) {
            res.status(401)
            next({
                name: "NoOrderItemsError",
                message: "No oder details exist to update"
            })
        } else {
                console.log("Get Order Details to Update:", getOrderDetails)

                const updateOrderDetails= await updateOrderDetails(updateFields)

                console.log("Updated Order Details:", updateOrderDetails)
                
                res.send(updateOrderDetails)
            }
        } catch (error){
            next (error)
        }
})

orderDetailsRouter.delete('/:orderDetailsId', userLoggedIn, async (req, res, next) => {
    const { orderDetailsId } = req.params;
    
    try {
        const deleteOrderDetails = await destroyOrderDetails(orderDetailsId)
        res.send(deleteOrderDetails)
            
        } catch ({name, message}){
            next ({name, message})
        }
})

module.exports = orderDetailsRouter;
