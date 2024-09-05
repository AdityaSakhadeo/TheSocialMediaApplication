// import express from 'express';
// import dotenv from 'dotenv'
// import connectDB from './db/db.js';
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import userRouter from './routes/user.routes.js'
// const app = express();
// dotenv.config();

// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))

// app.use(express.json({limit:"16kb"}));

// app.use(express.urlencoded({extended:true,limit:'16kb'}));

// app.use(express.static("public"));

// app.use(cookieParser());

// app.use("/api/v1/users",userRouter);

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000,()=>{
//         console.log(`Server is running on ${process.env.PORT}`);
//     })

//     app.get("/", (req, res) => {
//         res.send("server is ready and working");
//       });

//     app.get('/api/destinations',(req,res)=>{
//             const destinations=[
//                 { id: 1, name: 'Taj Mahal', city: 'Agra' },
//                 { id: 2, name: 'Golden Temple', city: 'Amritsar' },
//                 { id: 3, name: 'Gateway of India', city: 'Mumbai' },
//                 { id: 4, name: 'Hawa Mahal', city: 'Jaipur' },
//                 { id: 5, name: 'Meenakshi Amman Temple', city: 'Madurai' }
//             ];       
//             res.send(destinations);
//     })
// })
// .catch((error)=>{
//     console.log("Mongo DB connected failed!!",error);
// })

import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from 'dotenv';

dotenv.config({path:'../env'});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })

    app.get('/api/destinations',(req,res)=>{
        const destinations=[
            { id: 1, name: 'Taj Mahal', city: 'Agra' },
            { id: 2, name: 'Golden Temple', city: 'Amritsar' },
            { id: 3, name: 'Gateway of India', city: 'Mumbai' },
            { id: 4, name: 'Hawa Mahal', city: 'Jaipur' },
            { id: 5, name: 'Meenakshi Amman Temple', city: 'Madurai' }
        ];       
        res.send(destinations);
})
})
.catch((error)=>{
    console.log("Mongo DB connected failed!!",error);
})

