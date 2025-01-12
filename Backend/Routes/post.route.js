import express from "express"
import protectRoute from "../middleware/auth.middleware";
const router=express.Router();
router.get("/",protectRoute,getFeedPosts)
router.post("/create",protectRoute,createPost);
router.delete("/delete/:id",protectRoute,deletePost)
router.get("/:id",protectRoute,getPostsById)
export default router;