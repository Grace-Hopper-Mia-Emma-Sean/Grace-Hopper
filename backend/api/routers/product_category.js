const express = require("express");
const productCategoryRouter = express.Router();

const {
  updateAllProductCategories,
  getAllProductCategories,
  createProductCategory,
  getCategoryById,
  deleteProductCategory,
} = require("../../db");

productCategoryRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newCategory = await createProductCategory(req.body);
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
});

productCategoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getAllProductCategories();
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

productCategoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await getCategoryById(categoryId);
    res.send(category);
  } catch (error) {
    throw error;
  }
});

productCategoryRouter.delete("/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const updateCategories = await updateAllProductCategories(categoryId);
    const category = await deleteProductCategory(categoryId);
    res.status(200).send("This category was deleted!");
  } catch (error) {
    throw error;
  }
});

module.exports = productCategoryRouter;
