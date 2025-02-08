const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');


let answer ={}
let playerofmatch={}

function playerofthematch(data){

       for(let key in data){
             
           if(answer[data[key].season]){
            if(answer[data[key].season][data[key].player_of_match]) {
                answer[data[key].season][data[key].player_of_match]++;
            }
            else {
                answer[data[key].season][data[key].player_of_match]= 1;
            }
           }
           else {
            answer[data[key].season] = {
                [data[key].player_of_match] : 1
            }
           }
       }
}

playerofthematch(matches)

let make ={}

for(let key in answer){
  
  let find = answer[key]
   
       make[key] ={}

       let a=0;
        

   for(let val in find){
    if(find[val]>=a){
        a=find[val];
        make[key] = val
    }   
   }
      
}
// let find = Object.entries(answer)

// find[1] = find[1].sort((a,b)=> a-b)

// console.log(find);

console.log(make);

