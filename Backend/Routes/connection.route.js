import express from "express";
import protectRoute from "../middleware/auth.middleware";
import { sendConnectionRequest,getConnectionRequests
    ,acceptConnectionRequest, rejectConnectionRequest,
     getUserConnections, removeConnection, getConnectionStatus } from "../controllers/connection.controller";
import { get } from "mongoose";
const router=express.Router();
router.post("/request/:userId", protectRoute, sendConnectionRequest);
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);

router.get("/requests", protectRoute, getConnectionRequests);

router.get("/", protectRoute, getUserConnections);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus);