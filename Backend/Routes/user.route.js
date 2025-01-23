import express from "express"
import protectRoute from "../middleware/auth.middleware.js"
import {getSuggestedConnections, updateUserProfile ,getPublicProfile  } from "../controllers/user.controller.js"
const router=express.Router()
router.get("/suggestions",protectRoute,getSuggestedConnections)
router.get("/:username", protectRoute, getPublicProfile);
router.post("/updateProfile",protectRoute,updateUserProfile)

router.put("/profile", protectRoute, updateUserProfile);

export default router;