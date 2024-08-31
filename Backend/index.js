import express from 'express';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

app.get('/destinations', (req, res) => {
    const destinations=[
        "Manali",
        "Bangalore",
        "Kashmir",
        "Goa"
    ]
    res.send(`Available destinations are ${destinations}`);
});

app.get('/', (req, res) => {
    res.send(`we are on the port: ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
