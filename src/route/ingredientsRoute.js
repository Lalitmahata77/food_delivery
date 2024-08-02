import express from "express"
import { createIngredients, createIngredientsItem, findIngredientsCategoryById, findResturantIngredients, updateStock } from "../controller/ingredientsController.js"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/createIngredientsCategory").post(isAuthenticated,createIngredients)
router.route("/findIngredientsCategory/:id").get(findIngredientsCategoryById)
router.route("/findIngredientsByResturantId/:id").get(findResturantIngredients)
router.route("/createIngredientsItems").post(createIngredientsItem)
router.route("/update/:id").put(updateStock)
export default router