import userModel from "../../DB/modules/User.module.js"
import { comparehashing, hashing } from "../Services/Hashe&Compare.js"
import { sendEmail } from "../Services/confirmEmail.js"
import { compareToken, generateToken } from "../Services/generate&VerifyToken.js"
import { SignUp } from "./Auth.Validation.js"
export const getData=(req,res)=>{
    res.json({message:"this is data function"})
}
export const signup=async (req,res,next)=>{

    const {username,email,password}=req.body
                                                                    /*const vaall=SignUp.validate(req.body,{abortEarly:false})
                                                                    if(vaall.error){                                                    this is a short cut for joi to put it in the function but instead we put it in the validation.js to handle req.body or req.query
                                                                        return res.json({vaall})
                                                                    }*/
    const user=await userModel.findOne({email})
    if(user)
    {
        return res.json({message:"email is already exist"})
    }

    else {
        try{
        const hashed=hashing(password)
        const token=generateToken({email},process.env.emailSIGN)
        const link=`http://localhost:3000/confirm/${token}`
        sendEmail(email,`<a href=${link}>please click to confirm</a>`)
        
    const newUser= await userModel.create({username,email,password:hashed})

    return res.json({message:"Creating user",newUser})}
    catch(err){
        return res.json({message:"error because",err:err.stack})}

    }
}
export const confirmEmail=async(req,res)=>{
    const {token}=req.params;
    const verrify=compareToken(token,process.env.emailSIGN)
    if (verrify){
        await userModel.updateOne({email:verrify.email},{confirmEmail:true})
        return res.json({message:"verrified email"})
    }
        
}



export const signIn=async (req,res,next)=>{
   
    const {email,password}=req.body
    
    const user=await userModel.findOne({email})
    if(!user){
        return next(new Error("user doesn't exist"))

    }
    else
    if(user.confirmEmail==false)
    return res.json({message:"please confirm your email"})

   { const comaparePass = comparehashing(password,user.password)
    if(comaparePass)
    {
    const token=generateToken({id:user.id})
    return res.json({message:"Signing in user",token})
    }
   
   else
   {
   return res.json({message:"wrong password or email"})}

}
}
