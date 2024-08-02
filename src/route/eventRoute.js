import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js"
import { createEvent, deleteEvent, findAllEvents, findEventsById, findEventsByResturantId } from "../controller/eventController.js"
const router = express.Router()
router.route("/event").post(isAuthenticated,authorizeRoles("admin"), createEvent)
router.route("/events").get(isAuthenticated, findAllEvents)

router.route("/event/:id").get(isAuthenticated,findEventsById)
.delete(isAuthenticated,authorizeRoles("admin"),deleteEvent)
router.route("/eventR/:id").get(isAuthenticated,findEventsByResturantId)

export default router
