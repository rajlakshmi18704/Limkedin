import mongoose from "mongoose"
const postSchema= new mongoose.Schema({
content:{
    type:String,
   requird:true
},
image:
    {
type:String
    }
,
author:{type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true

},
likes:[
{
    type:mongoose.Schema.Types.ObjectId,ref:"User",requird:true
}
],
comments:[
    {
        content:{type:String},
        user:{
            type:mongoose.Schema.Types.ObjectId,ref:"User",requird:true
        },
        createdAt:{type:Date,default:Date.now}
    
    }
]
},
{timestamps:true}
)
const Post=mongoose.model("Post",postSchema)
export   default Post;