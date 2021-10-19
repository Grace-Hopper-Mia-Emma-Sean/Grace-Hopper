const express = require("express");
const productDiscountRouter = express.Router();

const {
    getAllProductDiscounts
} = require('../../db/adapters/product_discount')

productDiscountRouter.get('/', async (req, res, next) => {
    try {
        const discounts = await getAllProductDiscounts()
        res.send(discounts)
    } catch (error){
        throw (error)
    }
})



module.exports = productDiscountRouter;
