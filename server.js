const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db.json");
const router = require("express").Router();
const DB = require("./db");

const app = express();
const PORT = process.env.PORT || 8081;



app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/notes", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./notes.html"))
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db.json"))
});

app.get("/api/notes", function(req, res) {
    
    DB.getNote()
    .then((note) => res.join(note))
    .catch((err) => res.status(500).json(err));
});


app.post("/api/notes",function(req,res) {
   DB.addNote(req.body)
   .then((note) => res.json(note))
   .catch((err) => res.status(500).json(err));
   res.end();
});

app.delete("/api/notes/:id", function(req,res) {
    DB.removeNote(req.params.id)
    .then(() => res.send(200))
    .catch((err) => console.log(err));
});

app.listen(PORT, function() {
    console.log(`server is listening on PORT: http://localhost:${PORT}` );
});
