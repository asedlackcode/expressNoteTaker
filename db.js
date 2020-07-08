const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuidv1");

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class DB {
    read() {
        return readData("./db.json", "utf8");
    }
    write(note) {
        return writeData("./db.json", JSON.stringify(note));
    }
    getNote(){
        return this.read()
        .then (notes => {
            let parsedNote;
            try {
                parsedNote = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNote = [];
            }
            return parsedNote;
        });
    }

    addNote(note) {
        const {title, text} = note;
        const newNote = {title, text, id: uuidv1()};
        return this.getNote()
        .then (notes => [...notes,newNote])
        .then (writeNote => this.write(writeNote)
        .then (() => newNote)
        )
    }

    removeNote(id) {
        return this.getNote()
        .then (function (allNotes) {
            console.log(allNotes)
            return allNotes.filter(function (note) {
                console.log(note.id !== id)
                return note.id !== id
            });
        })

        .then(filterNotes => this.write(filterNotes));
    }
}

module.exports = new DB();