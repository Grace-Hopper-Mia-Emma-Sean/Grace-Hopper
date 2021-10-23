const express = require("express");
const productCategoryRouter = express.Router();

const {
    updateAllProductCategories
} = require('../../db/adapters/products')

const {
    getAllProductCategories, createProductCategory, updateCategory
} = require('../../db/adapters/product_category')

const {
    getCategoryById, deleteProductCategory
} = require('../../db/adapters/product_category');

const {
  authenticate, admin
} = require('../utils')

const { client } = require("../../db/client");

productCategoryRouter.post('/', authenticate, admin, async (req, res, next) => {
    const {name, description} = req.body;
    try {
        const newCategory = await createProductCategory(req.body)
        res.send(newCategory)
    } catch(error) {
        next(error)
    }
})

productCategoryRouter.get('/', async (req, res, next)=> {
    try {
        const categories = await getAllProductCategories();
        res.send(categories)
    } catch (error){
        next(error)
    }
})

productCategoryRouter.get('/:categoryId', async (req, res, next)=> {
    try {
        const {categoryId} = req.params
        const category = await getCategoryById(categoryId);
        res.send(category)
    } catch (error){
        throw(error)
    }
})

productCategoryRouter.patch('/:categoryId', authenticate, admin, async (req, res, next) => {
    try {
        const {categoryId} = req.params;
        const {name, description} = req.body;

        const updateFields={}

        if(name){
          updateFields.name=name
        }

        if(description){
          updateFields.description=description
        }
        const updatedCategory = await updateCategory(categoryId, updateFields)
        res.send(updatedCategory)
    } catch (error){
        throw error;
    }
})

productCategoryRouter.delete('/:categoryId', authenticate, admin, async (req, res, next) => {
    try {
        const {categoryId} = req.params
        const updateCategories = await updateAllProductCategories(categoryId)
        const category = await deleteProductCategory(categoryId)
        res.status(200).send("This category was deleted!")
    } catch (error){
        throw error
    }
        
})

module.exports = productCategoryRouter;
