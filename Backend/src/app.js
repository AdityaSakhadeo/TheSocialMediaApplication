import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
//all the configurations related to the application
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:'16kb'}));

app.use(express.static("public"));

app.use(cookieParser());

//Importing the routes here
import userRouter from './routes/user.routes.js'


//Declaring the routes here
app.use("/api/v1/users",userRouter); //now the url will be http://localhost:4000/user/(route that we want to use)
export { app };