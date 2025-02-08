const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
// const fs = require('node:fs');
const fs = require('fs');
let countmatch = {}
function numberofmatch(data){
   
     for(let key in data) {
       (countmatch[data[key].season])? countmatch[data[key].season]++ : countmatch[data[key].season] = 1;
     }
}

numberofmatch(matches)
console.log(countmatch);
fs.writeFile("../public/output/match-per-season.json",JSON.stringify(countmatch, null, 2), (err)=>{
  (err) ?    console.log("There is some error ", err) : console.log("okk done ");
});


