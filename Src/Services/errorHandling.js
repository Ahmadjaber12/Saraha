export const asyncHandler=(fun)=>{
    return(req,res,next)=>{ //return (req,res) // the asynchandler is in the router request so it have to return res and req  
         fun(req,res,next).catch(err=>{
return res.json({message:"Server Error",error:err.stack})//error:error.stack is deleted when you upload the project on server
         })
    }
}
export const globalError=(err,req,res,next)=>{
    if(err){
        return res.json(err.message)
    }
}