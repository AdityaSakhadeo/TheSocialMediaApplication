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
            const destinations=[
                { id: 1, name: 'Taj Mahal', country: 'Agra' },
                { id: 2, name: 'Golden Temple', country: 'Amritsar' },
                { id: 3, name: 'Gateway of India', country: 'Mumbai' },
                { id: 4, name: 'Hawa Mahal', country: 'Jaipur' },
                { id: 5, name: 'Meenakshi Amman Temple', country: 'Madurai' }
            ];       
            res.json(destinations);
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Error retrieving the destinations"});
        }
    })
})
.catch((error)=>{
    console.log("Mongo DB connected failed!!",error);
})

