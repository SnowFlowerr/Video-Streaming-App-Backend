import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        // required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    img:{
        type:String,
        default:"img"
    },
    followers:{
        type:Number,
        default:0,
    },
    searchHistory:{
        type:[{type:"String"}]
    },
    followedUser:{
        type:[{type:"String",ref:"Users"}]
    },
    history:{
        type:[{type:"String",ref:"Video"}]
    },
    liked:{
        type:[{type:"String",ref:"Video"}]
    },
    disliked:{
        type:[{type:"String",ref:"Video"}]
    },
    saved:{
        type:[{type:"String",ref:"Video"}]
    },
    shortsHistory:{
        type:[{type:"String",ref:"Shorts"}]
    },
    shortsLiked:{
        type:[{type:"String",ref:"Shorts"}]
    },
    shortsDisliked:{
        type:[{type:"String",ref:"Shorts"}]
    },
    shortsSaved:{
        type:[{type:"String",ref:"Shorts"}]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

export default mongoose.model("Users",UserSchema)