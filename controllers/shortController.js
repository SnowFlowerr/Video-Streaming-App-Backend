import { addError } from "../error.js";
import Shorts from "../models/Shorts.js";
import Users from "../models/Users.js";

export const createShorts=async(req,res,next)=>{
    try{
        const {name}=await Users.findById(req.user.id)
        const newVideo =new Shorts({userId:req.user.id,...req.body,name})
        const savedVideo=await newVideo.save();
        return res.status(200).json(savedVideo);
    }
    catch(err){
        next(err)
    }
}

export const updateShorts=async(req,res,next)=>{
    try{
        const video =await Shorts.findById(req.params.id)
        if(!video){
            return next(addError(404,"Video Not found !"))
        }
        if(video.userId==req.user.id){
            const updatedVideo=await Shorts.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            return res.status(200).json(updatedVideo);
        }
        return res.status(200).json("You cannot Update other's videos");
    }
    catch(err){
        next(err)
    }
}
export const getOneShorts=async(req,res,next)=>{
    try{
        const videos = await Shorts.findById(req.params.id).populate("userId");;
        if(!videos){
            return next(addError(404,"Video Not found !"))
        }
        return res.status(200).json(videos);
    }
    catch(err){
        next(err)
    }
}
export const getShorts=async(req,res,next)=>{
    try{
        const videos = await Shorts.findById(req.params.id);
        if(!videos){
            return next(addError(404,"Video Not found !"))
        }
        return res.status(200).json(videos);
    }
    catch(err){
        next(err)
    }
}

export const deleteShorts=async(req,res,next)=>{
    try{
        const video=await Shorts.findById(req.params.id,
        )
        if(!video){
            return next(addError(404,"Video Not Present"))
        }
        if(video.userId===req.user.id){
            await Videos.findByIdAndDelete(req.params.id,)
        }
        return res.status(200).json("Videos is Removed")
    }
    catch(err){
        next(err)
    }
}

export const getAllShorts=async(req,res,next)=>{
    const {limit,skip}=req.query;
    try{
        // const videos=await Shorts.aggregate({ $sample: { size: 2 } })
        const videos=await Shorts.find().sort({ _id: -1 }).limit(limit).skip(skip)
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}

export const addViews=async(req,res,next)=>{
    try{
        const videos=await Shorts.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        return res.status(200).json("View is Increased")
    }
    catch(err){
        next(err)
    }
}
export const getAllCategory=async(req,res,next)=>{
    try{
        const videos=await Shorts.find({category:req.params.id}).limit(10)
        
        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}
export const getSearchShorts=async(req,res,next)=>{
    try{
        const videos=await Shorts.find({"title" : {$regex : req.params.id,$options:"i"}})

        return res.status(200).json(videos)
    }
    catch(err){
        next(err)
    }
}
export const like=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{shortsLiked:req.params.id}
        });
        await Shorts.findByIdAndUpdate(req.params.id,{
            $inc:{likes:1}
        });
        res.status(200).json("liked")
    }
    catch(err){
        next(err)
    }
}
export const unlike=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{shortsLiked:req.params.id}
        });
        await Shorts.findByIdAndUpdate(req.params.id,{
            $inc:{likes:-1}
        });
        res.status(200).json("unliked")
    }
    catch(err){
        next(err)
    }
}
export const dislike=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $push:{shortsDisliked:req.params.id}
        });
        await Shorts.findByIdAndUpdate(req.params.id,{
            $inc:{dislikes:1}
        });
        res.status(200).json("disliked")
    }
    catch(err){
        next(err)
    }
}
export const undislike=async(req,res,next)=>{
    try{
        await Users.findByIdAndUpdate(req.user.id,{
            $pull:{shortsDisliked:req.params.id}
        });
        await Shorts.findByIdAndUpdate(req.params.id,{
            $inc:{dislikes:-1}
        });
        res.status(200).json("undisliked")
    }
    catch(err){
        next(err)
    }
}