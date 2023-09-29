import express from 'express'
import * as dotenv from "dotenv"
dotenv.config()
import InitApp from "./InitApp.js"
const app = express()
const port = 3000
InitApp(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))