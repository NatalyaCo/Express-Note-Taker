const express = require("express");
const fs = require("fs");
const path = require ("path");
const database = require ("./db/db.json")

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
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