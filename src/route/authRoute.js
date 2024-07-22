import express from "express"
import { getAllUser, getUserProfile, login, logout, register, updatePassword, updateUser } from "../controller/authController.js"
import { isAuthenticated } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/getUserProfile").get(isAuthenticated,getUserProfile)
router.route("/getAllUser").get(getAllUser)
router.route("/updatePassword").put(isAuthenticated,updatePassword)
router.route("/updateUserData").put(isAuthenticated,updateUser)
export default router