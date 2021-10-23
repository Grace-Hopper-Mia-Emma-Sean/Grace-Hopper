const express = require("express");
const productDiscountRouter = express.Router();

const {
    getAllProductDiscounts,
    createProductDiscount,
    getProductDiscountById,
    deleteProductDiscount,
    updateProductDiscount
} = require('../../db/adapters/product_discount')

const {
    updateAllProductDiscounts
} = require('../../db/adapters/products')

const {
  authenticate, admin
} = require('../utils')

productDiscountRouter.post('/', authenticate, admin, async (req, res, next) => {
    const {name, description, discount_percent, active} = req.body
    try{
        const newDiscount = await createProductDiscount(req.body)
        res.send(newDiscount)
    } catch (error){
        next(error)
    }
})

productDiscountRouter.get('/', async (req, res, next) => {
    try {
        const discounts = await getAllProductDiscounts()
        res.send(discounts)
    } catch (error){
        throw (error)
    }
})

productDiscountRouter.get('/:discountId', async (req, res, next) => {
    try {
        const {discountId} = req.params;
        const discount = await getProductDiscountById(discountId)
        if(!discount){
            res.status(401)
            next({
                name: "MissingDiscountError",
                message: "Error fetching discount with that Id"
            })
        } else {
            res.send(discount)
        }
    } catch (error) {
        next(error)
    }
})

productDiscountRouter.patch('/:discountId', authenticate, admin, async (req, res, next) => {
    try {
        const { discountId } = req.params;
        const {name, description, discount_percent, active} = req.body;

        const updateFields = {}

        if(name){
          updateFields.name=name
        }

        if(description){
          updateFields.description=description
        }

        if(discount_percent){
          updateFields.discount_percent=discount_percent
        }

        if(active){
          updateFields.active=active
        }

        const updatedDiscount = await updateProductDiscount(discountId, updateFields)
        res.send (updatedDiscount)
    } catch (error){
        throw error
    }
})

productDiscountRouter.delete('/:discountId', authenticate, admin, async (req, res, next) => {
    try {
        const {discountId} = req.params;
        const updateProducts = await updateAllProductDiscounts(discountId)
        const discount = await deleteProductDiscount(discountId)
        res.status(200).send("This discount was deleted!")
    } catch (error){
        throw error
    }
})


module.exports = productDiscountRouter;