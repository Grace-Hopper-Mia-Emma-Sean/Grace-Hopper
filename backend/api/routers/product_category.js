const express = require("express");
const productCategoryRouter = express.Router();

const { getAllProductCategories, getCategoryById } = require("../../db");

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

// paymentDetailsRouter.patch('/:paymentDetailsId', userLoggedIn, requiredNotSent({requiredParams: ["id, order_id, amount, provider, status"], atLeastOne: true}), async (req, res, next) => {
//     const { order_id, amount, provider, status } = req.body;
//     const { paymentDetailsId } = req.params;
//     const updateFields = {id: paymentDetailsId, order_id, amount, provider, status}

//     try {
//         const getPaymentDetails =  await getAllPaymentById(paymentDetailsId)
//         if (!getPaymentDetails) {
//             res.status(401)
//             next({
//                 name: "NoOrderItemsError",
//                 message: "No oder item exist to update"
//             })
//         } else {
//                 console.log("Get Order Items to Update:", getPaymentDetails)

//                 const updatedPaymentDetails= await updatePaymentDetails(updateFields)

//                 console.log("Updated Order Items:", updatedPaymentDetails)

//                 res.send(updatedPaymentDetails)
//             }
//         } catch (error){
//             next (error)
//         }
// })

module.exports = productCategoryRouter;
