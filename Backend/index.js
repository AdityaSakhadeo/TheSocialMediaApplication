
const express = require('express');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
const app = express();


const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
