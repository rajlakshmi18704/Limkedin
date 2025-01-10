import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute=async(req,res,next)=>{
try {
   const token= req.cookies["jwt-linkedin"]
   if(!token){
    return res.status(401).json({
        message:"token is not present"
    })
    
    }
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
    if(!decodedToken){
        return res.status(401).json({
message:"not a valid token"
        })}
 const user=   await User.findById(decodedToken.userId).select("-password")
    req.user=user
    next()
   
} catch (error) {
    console.log("unauthorized access",error)
    return res.status(401).json({
        message:"Usernot found"
    })
}
}
export default protectRoute