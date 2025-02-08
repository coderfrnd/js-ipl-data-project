
const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
// const fs = require('node:fs');
const fs = require('fs');
// const { log } = require('console');

let answer ={}

function matchwonperyear(data){

    for(let key in data){

        let winner = data[key]["winner"]
        let season = data[key]["season"]
        // console.log(season);
        season=season.toString()
     if( answer[winner]){
        if( answer[winner][season])  answer[winner][season]++;
        else answer[winner][season]=1
     }
   else{
    answer[winner]= {[season] : 1}

   }
      
       
        
    }
}

let x= matchwonperyear(matches)
// console.log(answer["Delhi Daredevils"]["2016"]);
console.log(answer);

fs.writeFile('../public/output/match-won-per-team-per-year.json' , JSON.stringify(answer,null,2),(err)=>{
    (err) ? console.log("There is some error", err):console.log("okk done");
    
    
})