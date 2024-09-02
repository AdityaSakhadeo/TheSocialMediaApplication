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

    app.get('/destinations',(req,res)=>{
        try {
            const destinations={
                "Taj Mahal": "Agra",
                "Golden Temple": "Amritsar",
                "Gateway of India": "Mumbai",
                "Hawa Mahal": "Jaipur",
                "Meenakshi Amman Temple": "Madurai"
            };       
            res.json(destinations);
        } catch (error) {
            console.error(error);
            res.status.send({message:"Error retrieving the destinations"});
        }
    })
})
.catch((error)=>{
    console.log("Mongo DB connected failed!!",error);
})

