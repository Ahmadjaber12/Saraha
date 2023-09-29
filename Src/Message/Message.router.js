import {Router} from "express"
import * as MessageController from "./Message.Controller.js"
import {asyncHandler} from "../Services/errorHandling.js"
import { Auth } from "../Services/MiddleWares/Auth.js"
const router=Router()
router.get('/getMessage',Auth,asyncHandler(MessageController.getMessage))
router.post("/sendMessage/:recevier_Id",asyncHandler(MessageController.sendMessage))
router.delete("/delete",Auth,asyncHandler(MessageController.deleteMessage))
export default router