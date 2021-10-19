const express = require("express");
const productsRouter = express.Router();

const {
    getAllProducts, getProductById, getProductsByCategoryId
} = require('../../db/adapters/products');

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products)
    } catch (error){
        next (error)
    }
})

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const {productId} = req.params
        const product = await getProductById(productId);
        if (!product){
            res.status(401)
            next({
                name: "MissingProductError",
                message: "Sorry, there was an error fetching that product."
            })
        } else {
            res.send(product)
        }
    } catch (error) {
        next (error)
    }
})

productsRouter.get('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params
        const products = await getProductsByCategoryId(categoryId)
        if(!products.length){
            res.status(401)
            next({
                name: 'Missing Category Error',
                message: 'Sorry, error fetching products by that category'
            })
        } else {
            res.send(products)
        }
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', async (req, res, next) => {
    const {name, description, SKU, category_id, price, discount_id} = req.body
    try {
        const newProduct = await createProduct(req.body)
        res.send(newProduct)
    } catch (error) {
        next (error)
    }
})

module.exports = productsRouter;
