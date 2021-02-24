const express = require('express');
const path = require('path');
const fs = require('fs');
const noteJSON = require('./db/db.json');
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// Needed to display html in local browser
app.use(express.static('./'));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTING
// GET Home HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET all notes in json
app.get('/api/notes', (req, res) => {
  res.json(noteJSON);
});

app.post('/api/notes', (req, res) => {
const lastId = noteJSON.length ? Math.max(...(noteJSON.map(note => note.id))) : 0;
const id = lastId + 1;
noteJSON.push( { id, ...req.body} );
res.json(noteJSON.slice(-1));
});


//Server Listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));