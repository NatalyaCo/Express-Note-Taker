const express = require("express");
const uuid = require("uuid");
const app = express();
const fs = require("fs");

var PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbFile = "./db/db.json";