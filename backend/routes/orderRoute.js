const express = require("express")
const { newOrder, getSingleOrderDetails,getMyOrderList, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController")
const { isAuthenticatedUser, isAuthorisedRole } = require("../middleware/auth")
const router = express.Router()

router.route("/order/new").post(isAuthenticatedUser ,newOrder)

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrderDetails)

router.route("/orders/me").get(isAuthenticatedUser,getMyOrderList)

router.route("/admin/orders").get(isAuthenticatedUser,isAuthorisedRole("admin"), getAllOrders)

router.route("/admin/order/:id")
.put(isAuthenticatedUser,isAuthorisedRole("admin"),updateOrderStatus)
.delete(isAuthenticatedUser,isAuthorisedRole("admin"),deleteOrder)

module.exports = router