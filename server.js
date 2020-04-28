const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

let note = [
    {
        id:1,
        body:"text in note"
    },
    {
        id:2,
        body:"the noted text"
    }
];

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/api/note", function(req, res) {
    return res.json(note);
})

app.listen(PORT, function() {
    console.log(`server is listening on PORT: http://localhost:${PORT}` );
});