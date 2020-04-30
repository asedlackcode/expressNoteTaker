const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db.json");
const router = require("express").Router();
const DB = require("./db");

const app = express();
const PORT = 8081;



app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/notes", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./notes.html"))
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

/*app.post("/api/notes", function (req, res) {
    var id = 1;
    var newNote = req.body.title;
    notes.push(newNote);
    id++;
    var notesJ = json.stringify(notes);
    fs.readFile("./db.json", "utf8", (err, res) => {
        if (err) throw err;
        ;
        
        fs.writeFile("./db.json", notesJ, "utf8", err => {
        if (err) throw err;
    })
    res.end();
    });
})*/

app.listen(PORT, function() {
    console.log(`server is listening on PORT: http://localhost:${PORT}` );
});
