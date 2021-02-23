const express = require('express');
const path = require('path');
const fs = require('fs');
const noteJSON = require('./db/db.json');
const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTING
// GET Home HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// GET notes HTML
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './notes.html'));
});

// GET all notes in json
app.get('/api/notes', (req, res) => {
  res.json(noteJSON);
});


//Server Listener
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));