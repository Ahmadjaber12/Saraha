import {Router} from "express"
import * as AuthController from "./Auth.Controller.js" 
import { asyncHandler } from "../Services/errorHandling.js"
import { Login, SignUp } from "./Auth.Validation.js"
import valid from "../Services/MiddleWares/validation.js"
const router = Router()

router.post("/signup",valid(SignUp),asyncHandler(AuthController.signup))
router.get("/",AuthController.getData)
router.post("/signin",valid(Login),asyncHandler(AuthController.signIn))
router.get("/confirm/:token",AuthController.confirmEmail)

export default router;