const notes = require('express').Router();
const {readFromFile, readAppend, writeToFile} = require('../helper/fsHelper');


notes.get('/', (req, res) => {
console.log(`${req.method} received`);
   
readFromFile('./db/db.json').then((data) => {res.json(JSON.parse(data));
    });
});