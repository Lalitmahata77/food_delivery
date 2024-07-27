import express from "express"
import { isAuthenticated } from "../middleware/authMiddleware.js"
import { createResturant, deleteResturant, favoritesResturant, getAllResturant, getResturantById, getResturantByUserId, searchResturant, updateResturantStatus } from "../controller/resturantController.js"
const router = express.Router()

router.route("/createResturant").post(createResturant)
router.route("/getAllResturant").get(getAllResturant)
router.route("/getResturantById/:id").get(getResturantById)
router.route("/getResturantByUserId/:id").get(getResturantByUserId)
router.route("/deleteResturant/:id").delete(isAuthenticated,deleteResturant)
router.route("/searchResturant").get(searchResturant)
router.route("/favorites").get(favoritesResturant)
router.route("/updateResturantStatus/:id").put(isAuthenticated,updateResturantStatus)
export default router