const express = require('express');
const fs = require('fs');
const errorHandler = require('npm2/lib/utils/error-handler');
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const notes = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.get('/api/notes', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    // fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    //     if (err) throw err;
    //     const notes = JSON.parse(data);
    //     const newNote = req.body;
    //     newNote.id = uuidv4();
    //     notes.push(newNote);
    //     fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), err => {
    //         if (err) throw err;
    //         res.json(newNote);
    //     });
    // });
    notes.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
});





app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

