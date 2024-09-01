import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/db.js';

const app = express();
dotenv.config()

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("Mongo DB connected failed!!",error);
})

