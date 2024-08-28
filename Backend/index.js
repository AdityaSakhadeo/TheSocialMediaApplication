
const express = require('express');

const app = express();


const PORT = process.env.PORT || 3000;s

app.get('/', (req, res) => {
    res.send('Backend Server running on :',PORT);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
