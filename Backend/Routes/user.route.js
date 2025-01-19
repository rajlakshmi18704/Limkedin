import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import {getSuggestedConnections, updateUserProfile } from "../controllers/user.controller.js"
const router=express.Router()
router.get("/suggestions",protectRoute,getSuggestedConnections)

router.post("/updateProfile",protectRoute,updateUserProfile)
export default router;