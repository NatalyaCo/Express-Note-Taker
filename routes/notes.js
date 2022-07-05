const notes = require('express').Router();
const {
    readFromFile,
    readAppend,
    writeToFile
} = require('../helper/fsHelper');

const ShortUniqueId = require('short-unique-id');


notes.get('/', (req, res) => {
    console.log(`${req.method} received`);

    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});

notes.post('/', (req, res) => {
    console.log(`${req.method} received`);

    const {
        title,
        text
    } = req.body;
    if (title && text) {
        const uid = new ShortUniqueId({
            length: 4
        });

        const newNote = {
            title,
            text,
            id: uid()
        };
        console.log(newNote);
        readAppend(newNote, './db/db.json');

        const response = {
            status: "success",
            body: newNote
        };

        res.json(response);
    } else {
        res.json("Error in posting note");
    }
});

notes.delete('/:id', (req, res) => {

    if (req.params.id) {
        console.log(`${req.method} received`);
        const noteId = req.params.id;
        const filteredDbArr = [];
        readFromFile('./db/db.json').then((data) => {
            dbArr = JSON.parse(data);

            filteredDbArr.push(...dbArr.filter((obj) => obj.id != noteId));
            writeToFile('./db/db.json', filteredDbArr);

            res.json(filteredDbArr);
        })
    } else {
        res.json("Error in deleting note");
    }
});

module.exports = notes;