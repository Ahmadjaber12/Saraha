import joi from 'joi'

export const SignUp={ body:joi.object({
    username:joi.string().alphanum().required(), //alphanum is for inputs have numbers+letters only
    email:joi.string().email().required(),
    password:joi.string().required(),
    cpassword:joi.string().valid(joi.ref('password')).required(),

}).required()}

export const Login={body: joi.object({
    email:joi.string().email({maxDomainSegments:2,tlds:{allow:['com']}}).required().messages({
        'any.required':"wrong baby"
}),
    password:joi.string().required(),
}).required()}
export const UpdatePassword={body: joi.object({
    newPass:joi.string().invalid(joi.ref('oldPass')).min(5).required(),
    oldPass:joi.string().required(),
    cPassword:joi.string().valid(joi.ref('newPass')).required().messages({
        "message":"wrong confirm Password"}),
}).required()}
