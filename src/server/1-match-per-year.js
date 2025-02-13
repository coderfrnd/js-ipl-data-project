const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const writeFile = require('../data/writefile/write-file.js')

function numberofmatch(data){
   
let countmatch = {}
     for(let key in data) {
    // Here key is every single single individual object key and object is value
      
      if(countmatch[data[key].season]) countmatch[data[key].season]++ 
      else countmatch[data[key].season] = 1;

      // Here data[key].season give us every year information about which year then using countmatch object we calculate match
     }
     return countmatch
}

let countmatch = numberofmatch(matches)
// console.log(countmatch);
// Writefile function a custom function which is take two argument one is name and second one is in which formate we want to convert
writeFile("1-match-per-season.json",JSON.stringify(countmatch,null,3))