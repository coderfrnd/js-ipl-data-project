const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');

let matchid = matches.filter((info) => info.season == 2016).map((info) => {
   return info.id
})
let answer ={}
function extrarunconceded(data){
   matchid.forEach((num)=>{
      for(let key in data){
         if(data[key].match_id == num){
            if(answer[data[key].bowling_team]){
               let convert = data[key].extra_runs
               answer[data[key].bowling_team]["extrarun"] += Number(convert);
               // console.log(answer[data[key].bowling_team]);
               
            }
            else {
               let convert = data[key].extra_runs
               answer[data[key].bowling_team] = {extrarun : Number(convert)}
            }

         }
      }
   })
}

fs.writeFile('../public/output/extra-run-conceded-per-team.json',JSON.stringify(answer,null,2),(err)=>{
if(err){
   console.log(err);
   
}
else console.log("done okk ");

})


extrarunconceded(deliveries)
// console.log(answer);