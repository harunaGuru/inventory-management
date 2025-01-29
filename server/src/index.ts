import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboardRoute"
import productRoutes from './routes/productRoute'
import userRoute from './routes/usersRoute'
import expenseRoute from './routes/expenseRoute'
//configuration 
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

//Routers

app.use("/dashboard", dashboardRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoute)
app.use("/expenses", expenseRoute)

const port = Number(process.env.PORT ) || 3001;
app.listen(port, ()=>{
    console.log(`Server running on Port ${port}`)
})