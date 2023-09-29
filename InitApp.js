import connectDB from "./DB/Connection.js"
import Authrouter from "./Src/Auth/Auth.router.js"
import Messagerouter from "./Src/Message/Message.router.js"
import { globalError } from "./Src/Services/errorHandling.js"
import userRouter from './Src/User/User.router.js'
const appinit =(app,express)=>{
    connectDB()
    app.use(express.json()) 
    app.use(userRouter)
    app.use(Messagerouter)
    app.use(Authrouter)
    app.use('*',(req,res)=>{
        return res.json({message:'page not found'})
    })
    app.use(globalError)
}
export default appinit