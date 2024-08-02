import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware.js"
import { removeItemFromCart, updateCardItemQuantity } from "../controller/cartController.js"
const router = express.Router()

router.route("/updateCart/:id").put(isAuthenticated, updateCardItemQuantity)
router.route("deleteCart/:id").delete(isAuthenticated,removeItemFromCart)



export default router