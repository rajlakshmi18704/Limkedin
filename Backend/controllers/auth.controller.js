import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {sendWelcomeEmail } from "../emails/emailHandler.js"
// import protectRoute from "../middleware/auth.middleware.js"
export const signup= async(req,res)=>{
   
    try {
        const {name,username,password,email}=req.body
        console.log(name,email)
        if(
            [name,username,email,password].some(field=>field?.trim()==="")
           
        )
        return res.status(400).json({ message: "All fields are required" });
        const existedUser=await User.findOne({
            $or:[{username},{email}]
           

        })
        if(existedUser){
         return res.status(400).json({
            message:"User with email or username already exists"
         })
        }
    if(password.length<6){
        return res.status(400).json({
            message:"Password length must be greater than 6"
        })
    }
    const salt=await bcrypt.genSalt(10)
    const hashpassword=await bcrypt.hash(password,salt)
const user=new User({
    name,
    email,
    password:hashpassword,
    username
})
 await user.save()
const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,
   {expiresIn:"3d"}
 )
 res.cookie("jwt-linkedin",token,{
httpOnly:true,
maxAge:3*24*60*1000,
sameSite:"strict",
secure:process.env.NODE_ENV==="production"
 })
 res.status(201).json({message:"user created successfully"})
const profileUrl=process.env.CLIENT_URL+"/profile/"+user.username
try {
    await sendWelcomeEmail(user.email,user.name,profileUrl)
} catch (error) {
    console.log("could not send welcome email",error)
}

    } catch (error) {
       console.log("Error in signin the user",error)
       res.status(500).json({
        message:"problem for signin the user"
       })
    }
}
export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Create and send token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
		await res.cookie("jwt-linkedin", token, {
			httpOnly: true,
			maxAge: 3 * 24 * 60 * 60 * 1000,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
		});

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
export const logout=(req,res)=>{
    res.clearCookie("jwt-linkedin");
    res.json({
        message:"Logged out successfully"
    })
}
export const getCurrentUser=async(req,res)=>{
try {
    res.json(req.user)
   

} catch (error) {
    console.log("Error in getCurrentUser",error)
    res.status(401).json({
        message:"Server error"
    })
}
}