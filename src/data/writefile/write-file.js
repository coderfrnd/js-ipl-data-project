const fs = require('fs');


function writeFile(filename, convert) {
    fs.writeFile(`../public/output/${filename}`, `${convert}`, (err) => {
        err ? console.log("Here Some Problem", err) : console.log("Everything is fine");
    });
}

module.exports = writeFile