import express from "express"
import dotenv from "dotenv"


import authRoutes from "./Routes/auth.route.js"
import userRoutes from "./Routes/user.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import NotificationRoutes from "./Routes/notification.route.js"
import { getFeedPosts,createComment } from "./controllers/post.controller.js"
import protectRoute from "./middleware/auth.middleware.js"
dotenv.config()
const app= express()
app.use(cookieParser())
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/posts",getFeedPosts)
app.post("/:id/comment",protectRoute,createComment)
app.use("api/v1/notifications",NotificationRoutes)
app.use("/api/v1/connections",connectionRoutes)
app.listen(PORT,()=>{
    console.log("Server running on this  port",PORT)
    connectDB()
})
