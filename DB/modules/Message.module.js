import mongoose, { Schema,Types,model } from "mongoose";
const UserSchema=new Schema({
    Message:{
        type:String,
        required:true
    },
   
    recevier_Id:{
        type:Types.ObjectId
        ,required:true
    }
},{
    timestamps:true
}
)
const MessageModel= mongoose.models.Message || model("Message",UserSchema) //mongoose.models.User is for checking if the User table is exist to not creating it another time and that's happining in the bog requests projects like 500  request
export default MessageModel