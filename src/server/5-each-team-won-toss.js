const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');


let answer = {}

 function tossandmatchwinnerteam(data){
  
    for(let key in data){
        if(data[key].toss_winner == data[key].winner){
             
            if(answer[data[key].toss_winner]){
                answer[data[key].toss_winner]++;
            }
            else answer[data[key].toss_winner] = 1;
        }
    }
 }

 tossandmatchwinnerteam(matches)

 fs.writeFile('../public/output/each-team-won-toss-match.json', JSON.stringify(answer,null,3),(err)=>{
    (err) ? console.log("There is a error") : console.log("Good");
    
    
 })

//  console.log(answer);
 