import mongoose from "mongoose";
const userSchema=new mongoose.method({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        dafault:""
    },
    bannerImg:{
        type:String,
        dafault:""
    },
    headline:{
        type:String,
       dafault:"Linkedin User"
    },
    location:{
        type:String,
        dafault:"Earth"
    },
about:{
    type:String,
    dafault:""
},
Skills:[String],
experience:[
    {
        title:String,
        company:String,
        startData:Date,
        description:String 
    }
  
],
education:[
    {
        school:String,
        fieldOfStudy:""
    }
]
},
   {timeStamps:true} 
)
export const User=mongoose.model("User",userSchema
)


