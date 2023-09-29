import userModel from "../../DB/modules/User.module.js"
import { comparehashing, hashing } from "../Services/Hashe&Compare.js"
import cloudinary from "../Services/cloudinary.js"
export const Profile= async(req,res)=>{
    const user=await userModel.findById(req.id).select("username")
   return res.json({message:"Hello from ",user})
    // const user=await userModel.find({})
}
// export const profilePicture=async(req,res,next)=>{
//     if(!req.file){
//         return next(new Error("there is No picture"))
//     }
//     const {public_id,api_secret}= await cloudinary.v2.uploader.upload(req.file.path, {
//         folder: `test-directory`
//        });
//     const user=await userModel.updateOne({_id:req.id},{profilePic:public_id},{new:false})
//     await cloudinary.uploader.destroy(user.profilePic)
//     return res.json({message:"new profile pic"})
// }import cloudinary from 'cloudinary';

export const profilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new Error("There is no picture"));
    }

    const { public_id, api_secret } = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `user/ahmad/${req.id}`,
    });
    console.log(public_id)
    const user = await userModel.findByIdAndUpdate( req.id, { profilePic: public_id }, { new: false });

    // Make sure the userModel updateOne method returns the updated user
    console.log(user);
    if (!user) {
      throw new Error("User not found or update failed");
    }
    console.log(user.profilePic)
    // Destroy the previous profilePic if it exists
    if (user.profilePic) {
      await cloudinary.uploader.destroy(user.profilePic);
    }
    console.log(user)
    return res.json({ message: "New profile pic" });
  } catch (error) {
    // Handle the error here
    console.error("Error in profilePicture:", error);
    return next(error); // Pass the error to the error handling middleware
  }
};
export const UpdatePass=async(req,res,next)=>{
  const {oldPass,newPass,cPassword}=req.body
  const user=await userModel.findById(req.id)
  const checkkk= comparehashing(oldPass,user.password)
  if(checkkk){
  const newhashPass =await hashing(newPass,process.env.NumHashed)
    await userModel.findByIdAndUpdate(req.id,{password:newhashPass})
  }
  else{
    return next(new Error("this Password isn't correct"))
  }
  return res.json({message:"Password Updated Successfully"})
}
