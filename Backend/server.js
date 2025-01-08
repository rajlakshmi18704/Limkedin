import express from "express"
import dotenv from "dotenv"
dotenv.config()
const PORT=process.env.PORT || 5000
const app= express()

import router from "./Routes/auth.route.js"
import { connectDB } from "./lib/db.js"
app.listen((PORT,()=>{
    console.log("Server running on this  port",PORT)
    connectDB()
}))
app.use("/api/v1/auth",router)