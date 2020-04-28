const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db.json");


const app = express();
const PORT = 8085;

var notes = [];

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
    
    res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes",function(req,res) {
    fs.readFile("./db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        } 
        return res.json(data);
    });
});

app.post("/api/notes", function (req, res) {
    fs.writeFile("./db.json", "utf8")
})

app.listen(PORT, function() {
    console.log(`server is listening on PORT: http://localhost:${PORT}` );
});
