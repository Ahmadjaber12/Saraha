import mongoose, { Schema,model } from "mongoose";
const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    profilePic:{
        type:String
    }
},{
    timestamps:true
}
)
const userModel= mongoose.models.User || model("User",UserSchema) //mongoose.models.User is for checking if the User table is exist to not creating it another time and that's happining in the bog requests projects like 500  request
export default userModel