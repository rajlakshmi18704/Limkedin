import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import { getSuggestedconnections, updateUserProfile } from "../controllers/user.controller.js"
const router=express.Router()
router.get("/suggestions",protectRoute,getSuggestedconnections)

router.post("/updateProfile",protectRoute,updateUserProfile)
export default router;