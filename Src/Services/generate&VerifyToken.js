import jwt from "jsonwebtoken"
export const generateToken=(payLoad,signiture=process.env.sign,expiresIn="1h")=>{
    const token=jwt.sign(payLoad,signiture,{expiresIn})
    return token
}
export const compareToken=(token,signiture=process.env.sign)=>{
    const isReal=jwt.verify(token,signiture)
    return isReal;
}