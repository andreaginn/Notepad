const express = require('express');
const fs = require('fs');
const errorHandler = require('npm2/lib/utils/error-handler');
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), err => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});





app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

