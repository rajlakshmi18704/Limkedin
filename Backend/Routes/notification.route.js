import express from "express";
const router=express.Router()
import {getUserNotifications,markNotificationAsRead,deleteNotification} from "../controllers/notification.controller.js"
import protectRoute from "../middleware/auth.middleware.js";
router.get("/",protectRoute,getUserNotifications)
router.post("/:id/read",protectRoute,markNotificationAsRead)
router.delete("/:id",protectRoute,deleteNotification)
export default router
