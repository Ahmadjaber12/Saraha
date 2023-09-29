import userModel from "../../../DB/modules/User.module.js";
import * as TokenFunctions from "../generate&VerifyToken.js"
export const Auth=async(req,res,next)=>{
    const {token} =req.headers; //we put token in headers because this way we can take it in any request(post,get ...etc), in params or body not all requests we can take it from it)(مش كل ريكوست بزبط توخذ من البرامز او البودي )
    if(!token.startsWith(process.env.BARIER))
    {
        return res.json({message:"Wrong Token"})
    }
    else{
        const realToken=token.split(process.env.BARIER)[1]
        if(!realToken)
        {
    
            return res.json({message:"empty Token"})

        }   
         else

        {
        let decoded= TokenFunctions.compareToken(realToken)
        if(decoded)
        { const existUser=await userModel.findById(decoded.id)
        req.id=decoded.id
        next()

        }}
}
}