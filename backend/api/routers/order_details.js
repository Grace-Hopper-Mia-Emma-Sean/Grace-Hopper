const express = require("express");
const orderDetailsRouter = express.Router();

const {
    getAllOrderDetails,
    getAllOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    destroyOrderDetails
} = require ('../../db')

const {userLoggedIn} = require('./utils')

orderDetailsRouter.post("/", userLoggedIn, async (req, res, next) => {
    const {total} = req.body
    try{
        const createdOrderDetails = await createOrderDetails ({user_id, total, payment_id })
            res.send(createdOrderDetails)
    }catch (error) {
        throw (error )
    }
})

orderDetailsRouter.get("/", async (req, res, next) => {
    try {
        const allOrderDetails =  await getAllOrderDetails();
        res.send(allOrderDetails)
    } catch (error) {
        throw (error)
    }
})

orderDetailsRouter.patch('/:orderId', userLoggedIn, async (req, res, next) => {
    const { total } = req.body;
    const { order_id } = req.params;
    try {
        const originalOrder = await getAllOrderDetailsById(order_id)
        if (originalOrder) {
            const updatedOrder= await updateOrderDetails ({id, user_id, total, payment_id})
            res.send(updatedOrder)
        }
    } catch (error) {
        throw (error)
    }
})

orderDetailsRouter.delete('/:orderId/', userLoggedIn, async (req, res, next) => {
    const { order_id } = req.params;
    try {
        const allOrders = await destroyOrderDetails(order_id)
        res.send(allOrders)
    } catch (error){
        next (error)
    }
})


module.exports = orderDetailsRouter;
