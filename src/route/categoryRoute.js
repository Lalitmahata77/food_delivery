import express from "express"
import { createCategory, findCategoryById, findCategoryByResturantId } from "../controller/categoryController.js"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/createCategory").post(isAuthenticated,createCategory)
router.route("/category/:id").get(findCategoryByResturantId)
.get(findCategoryById)
export default router