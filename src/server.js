import express from "express"
const app = express()
import dotenv from "dotenv"
import connectMongoDb from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
dotenv.config({path : "src/config/config.env"})
const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser())


import authRouter from "./route/authRoute.js"
import resturantRouter from "./route/resturantRoute.js"
app.use("/api/v2", authRouter)
app.use("/api/v2", resturantRouter)
app.listen(PORT, ()=>{
    connectMongoDb()
    console.log(`server is listening on port ${PORT}`);
})