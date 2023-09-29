import multer from "multer"
export function AHM(err,req,res,next){
    if(err)
{    return res.status(400).json({message:"Multer ERROR",err})
}
    else
    next()
}
function fileUpload(){
        const storage= multer.diskStorage({})

        function filefulter(req,file,cb){
            if(file.mimetype=="image/jpeg"||file.mimetype=='image/png'||file.mimetype=='image/gif')
{            cb(null,true)
}            
            else
                cb("invalid format",false)
        }
        const upload=multer({fileFilter:filefulter,storage})
        return upload;
}
export default fileUpload;