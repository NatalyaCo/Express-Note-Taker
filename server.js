const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.route("/api/notes")

    .get(function (req, res) {
        res.json(database);
    })

    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 22;

        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {

                highestId = individualNote.id;
            }
        }

        newNote.id = highestId + 1;

        database.push(newNote)


        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(error);
            }
            console.log("Note saved SUCCESSFULLY!");
        });
        res.json(newNote);
    });

app.listen(PORT, function () {
    console.log("Listening using PORT " + PORT);
});