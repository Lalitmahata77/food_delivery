import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
import { deleteFood, getResturantFood, newFood } from "../controller/foodController.js"
const router = express.Router()

router.route("/admin/newFood").post(isAuthenticated,authorizeRoles("admin"),newFood)
router.route("/admin/delete/:id").delete(isAuthenticated,authorizeRoles("admin"),deleteFood)
router.route("/getResturantFood").get(getResturantFood)
export default router