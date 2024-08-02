import express from "express"
import { deleteOrder, getAllOrder, myOrders, newOrder, orderDetails, updateOrder } from "../controller/orderController.js"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()


router.route("/newOrder").post(isAuthenticated,newOrder)
router.route("/order/:id").get(isAuthenticated,orderDetails)
router.route("/myOrder").get(isAuthenticated,myOrders)
router.route("/orders").get(getAllOrder)
router.route("/admin/orders/:id").put(isAuthenticated,authorizeRoles("admin"), updateOrder)
.delete(isAuthenticated,authorizeRoles("admin"),deleteOrder)
export default router