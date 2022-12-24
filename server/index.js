const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Wold');
});


app.listen(5000, () => {
    console.log('Running on Port 5000');
});