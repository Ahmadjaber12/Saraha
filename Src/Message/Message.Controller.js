import MessageModel from "../../DB/modules/Message.module.js";
import userModel from "../../DB/modules/User.module.js";

export const getMessage=async (req,res)=>{
    const id =req.id
    const Messages= await MessageModel.find({recevier_Id:id})

    return res.json({message:"hello from message List ",Messages})
    
}
export const sendMessage=async (req,res)=>{
    const {recevier_Id}=req.params;
    const {message}=req.body;
    let user= await userModel.findById(recevier_Id)
    if(!user)
    return res.status(404).json({mesage:"User Not Found"})
    else 
    {
        const newMessage=await MessageModel.create({recevier_Id,Message:message})
        return res.json({message:"Success creation for message"})
    }
}

export const deleteMessage=async (req,res)=>{
    const id=req.id
    const {messag}=req.body
    const messageDelete=await MessageModel.find({recevier_Id:id,Message:messag}).select("Message")
    // res.json({messageDelete}) this code is incorrect because i can't send two res to the server
    if(messageDelete.length <= 0){
        return res.json({message:"there is no message like this"})

    }
    else{
    await MessageModel.deleteOne({Message:messag,recevier_Id:id})
    return res.json({message:"successfully deleted"})
}}