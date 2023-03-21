const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile
})


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});