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
import foodRouter from "./route/foodRoute.js"
import cartRoute from "./route/cartRoute.js"
import orderRoute from "./route/orderRoute.js"
import categoryRoute from "./route/categoryRoute.js"
import ingredientRoute from "./route/ingredientsRoute.js"
import eventRoute from "./route/eventRoute.js"
app.use("/api/v2", authRouter)
app.use("/api/v2", resturantRouter)
app.use("/api/v2", foodRouter)
app.use("/api/v2", cartRoute)
app.use("/api/v2", orderRoute)
app.use("/api/v2",categoryRoute)
app.use("/api/v2",ingredientRoute)
app.use("/api/v2", eventRoute)
app.listen(PORT, ()=>{
    connectMongoDb()
    console.log(`server is listening on port ${PORT}`);
})