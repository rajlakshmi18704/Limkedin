import Notifications from "../models/notification.model.js"
export const getUserNotifications=async(req,res)=>{
    try {
        const notifications=await Notifications.find({recipient:req.user._id})
        .sort({createdAt:-1})
        .populate("relatedUser","name username profilePicture")
        .populate("relatedPost","contentImage ")
        res.status(200).json(notifications)
    } catch (error) {
        console.log("Error in getUserNotifications",error)
        res.status(500).json({message:"getting notifications failed"})
    }
}
export const markNotificationAsRead=async(req,res)=>{
    try {
        const notificationId=req.params.id
        const notification=await Notifications.findByIdAndUpdate(
            {_id:notificationId,recipient:req.user._id},
            {read:true},{new:true}
        );
        res.status(200).json(notification)
    }
    catch (error) {
        console.log("Error in markNotificationAsRead",error)
        res.status(500).json({message:"marking notification as read failed"})
    }
}
export const deleteNotification=async(req,res)=>{
    const notificationId=req.params.id
    try {
        await Notifications.findOneAndDelete({
            _id:notificationId,recipient:req.user._id,   
        })
    res.json({message:"notification deleted"})
    } catch (error) {
        res.status(500).json({message:"deleting notification failed"})
    }
}