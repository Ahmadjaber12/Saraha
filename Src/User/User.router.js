import {Router} from "express"
import * as UserController from './User.Controller.js'
import { Auth } from "../Services/MiddleWares/Auth.js"
import fileUpload,{AHM} from "../Services/Multer.js"
import valid from "../Services/MiddleWares/validation.js"
import { UpdatePassword } from "../Auth/Auth.Validation.js"
const router=Router()
router.get('/profile',Auth,UserController.Profile)
router.patch("/profilePic",Auth,fileUpload().single("image"),AHM,UserController.profilePicture)
router.patch("/updatePassword",Auth,valid(UpdatePassword),UserController.UpdatePass)
export default router