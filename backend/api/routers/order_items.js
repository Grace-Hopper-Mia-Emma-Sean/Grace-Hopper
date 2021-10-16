const express = require("express");
const orderItemsRouter = express.Router();

const { 
    getAllOrderItems,
    getAllOrderItemsById,
    updateOrderItems,
    destroyOrderItems,
    createOrderItems
} = require ('../../db')

const {userLoggedIn, requiredNotSent} = require('./utils')

orderItemsRouter.post("/", async (req, res, next) => {
    const orderId = req.user.order_details.id;
    const productId = req.product.id;
    const {quantity} = req.body
    try{
        const createOrderItems = await createOrderItems({order_id:orderId, product_id:productId, quantity})
            res.send(createOrderItems)
    }catch (error) {
        next (error )
    }
})

orderItemsRouter.get("/", async (req, res, next) => {
    try {
        const allOrderItems =  await getAllOrderItems();
        res.send(allOrderItems)
    } catch (error) {
        next (error)
    }
})

orderItemsRouter.patch('/:orderItemsId', userLoggedIn, requiredNotSent({requiredParams: ["id", "order_id", "product_id", "quantity"], atLeastOne: true}), async (req, res, next) => {
    const { quantity } = req.body;
    const { orderItemsId } = req.params;
    const orderId = req.user.order_details.id;
    const productId = req.product.id;
    const updateFields = {id: orderItemsId, order_id:orderId, product_id:productId, quantity}
    
    try {
        const getOrderItems =  await getAllOrderItemsById(orderItemsId)
        if (!getOrderItems) {
            res.status(401)
            next({
                name: "NoOrderItemsError",
                message: "No oder item exist to update"
            })
        } else {
                console.log("Get Order Items to Update:", getOrderItems)

                const updatedOrderItems= await updateOrderItems(updateFields)

                console.log("Updated Order Items:", updatedOrderItems)

                res.send(updatedOrderItems)
            }
        } catch (error){
            next (error)
        }
})

orderItemsRouter.delete('/:orderItemsId', userLoggedIn, async (req, res, next) => {
    const { orderItemsId } = req.params;
    try {
        const deleteOrderItem = await destroyOrderItems(orderItemsId)
        res.send(deleteOrderItem)
            
        } catch ({name, message}){
            next ({name, message})
        }
})

module.exports = orderItemsRouter;
