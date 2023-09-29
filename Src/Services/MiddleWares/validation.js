let data=['query',"body"]
 const valid=(functionn)=>{//we want to apply the same code to all functions
    return (req,res,next)=>{
        const validArray=[]
        data.forEach(key=>{
        if(functionn[key]){
            const valed=functionn[key].validate(req[key],{abortEarly:false});
            if(valed.error)
             validArray.push(valed.error.details)

        }})
        if(validArray.length > 0){
            return res.json({message:"errors are",validArray})
        }
        else
         next()
}}
export const generalExp={

//

}
export default valid