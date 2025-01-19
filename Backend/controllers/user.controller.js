import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js";
export const getSuggestedConnections = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id).select("connections");

		// find users who are not already connected, and also do not recommend our own profile!! right?
		const suggestedUser = await User.find({
			_id: {
				$ne: req.user._id,
				$nin: currentUser.connections,
			},
		})
			.select("name username profilePicture headline")
			.limit(3);

		res.json(suggestedUser);
	} catch (error) {
		console.error("Error in getSuggestedConnections controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getPublicProfile=async(req,res)=>{
    try {
     const user= await User.findOne({username:req.params.username}) .select("-password")
     if(!user){
        return res.status(404).json({
            Message:"user not found"
        })
     }
     return res.json(user)
    } catch (error) {
        console.log("error in public profile",error)
        return res.status(401,"Error in getting publicProfile",error)
    }
}
export const updateUserProfile=async(req,res)=>{
    try {
     const allowedFields=[
        "name",
        "headline",
        "about",
        "profilePicture",
        "location",
        "skills",
        "bannerImg",
        "experience",
        "education"
     ]   
     const updatedData={};
     for (const  field of allowedFields ){
        if(req.body[field]){
updatedData[field]=req.body[field];
        }
     }
     if(req.body.profilePicture){
        const result= await cloudinary.uploader.upload(req.body.profilePicture);
        updatedData.profilePicture=result.secure_url
     }
     if(req.body.bannerImg){
        const result= await cloudinary.uploader.upload(req.body.bannerImg);
        updatedData.bannerImg=result.secure_url
     }
     const user=await User.findByIdAndUpdate(req.user._id,{$set:updatedData},{new:true});
     res.json(user);
    } catch (error) {
        
    }
}