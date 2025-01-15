import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./Routes/auth.route.js"
import userRoutes from "./Routes/user.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import notificationRoutes from "./Routes/notification.route.js"
import connectionRoutes from "./Routes/connection.route.js"
import postRoutes from "./Routes/post.route.js"
import protectRoute from "./middleware/auth.middleware.js"
dotenv.config()
const app= express()
app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser())
const PORT=process.env.PORT || 5000
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
   
}));
app.use(express.json())


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);
app.listen(PORT,()=>{
    console.log("Server running on this  port",PORT)
    connectDB()
})
