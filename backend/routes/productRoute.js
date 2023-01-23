const express = require("express");
const { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails } = require("../controllers/productController");
const { createProductReview, getProductReviews, deleteReview } = require("../controllers/userControllers");
const { isAuthenticatedUser ,isAuthorisedRole} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts)

router.route("/admin/product/new").post(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,createProduct)

router
.route("/admin/product/:id")
.put(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,updateProduct)
.delete(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser,createProductReview)

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router