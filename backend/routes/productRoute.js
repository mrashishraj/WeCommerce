const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser ,isAuthorisedRole} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,createProduct)
router
.route("/product/:id")
.put(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,updateProduct)
.get(getProductDetails)
.delete(isAuthenticatedUser,isAuthorisedRole("admin"),isAuthenticatedUser,deleteProduct)

module.exports = router