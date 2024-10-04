import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';

dotenv.config({path:'../env'});

const app = express();
//all the configurations related to the application
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:'16kb'}));

app.use(express.static("public"));

app.use(cookieParser());

//Importing the routes here
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'



//Declaring the routes here
app.use("/api/v1/users",userRouter); //now the url will be http://localhost:4000/user/(route that we want to use)
app.use("/api/v1/posts",postRouter); 
export { app };