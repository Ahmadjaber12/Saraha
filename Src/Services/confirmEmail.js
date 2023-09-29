import nodemailer from "nodemailer";
export async function sendEmail (to,html) {
  const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.passEmail,
  },
});

// async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Ahmad Zalat "<${process.env.Email}>`, // sender address
    to , // list of receivers
    subject: `please confirmation`, // Subject line
    text: "Please Conirm your email", // plain text body
    html, // html body
  });}
 
  