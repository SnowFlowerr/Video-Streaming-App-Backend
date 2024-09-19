import mongoose from "mongoose";

const shortsSavedSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        ref:"Shorts",
        required:true,
    },
},{timestamps:true})

export default mongoose.model("shortsSaved",shortsSavedSchema)