import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from 'dotenv';

dotenv.config({path:'../env'});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`);
    })

//     app.get('/api/destinations',(req,res)=>{
//         const destinations=[
//             { id: 1, name: 'Taj Mahal', city: 'Agra' },
//             { id: 2, name: 'Golden Temple', city: 'Amritsar' },
//             { id: 3, name: 'Gateway of India', city: 'Mumbai' },
//             { id: 4, name: 'Hawa Mahal', city: 'Jaipur' },
//             { id: 5, name: 'Meenakshi Amman Temple', city: 'Madurai' }
//         ];       
//         res.send(destinations);
// })
})
.catch((error)=>{
    console.log("Mongo DB connected failed!!",error);
})

