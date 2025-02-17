// find the highest man of the match award for each team 
const matches = require('../data/matches.json')

function getManOfTheMatchAward(matchesdata){
let answer=    matchesdata.reduce((answeracc,ele)=>{
         if(answeracc[ele.winner]){
            if( answeracc[ele.winner][ele.player_of_match]){
                answeracc[ele.winner][ele.player_of_match]++;
            }
           else {
            answeracc[ele.winner][ele.player_of_match]=1
           }
         }
         else{
            answeracc[ele.winner]={}
            answeracc[ele.winner][ele.player_of_match]=1
         }
         return answeracc

    },{})
   return answer
    
}

let manOfTheMatchData = getManOfTheMatchAward(matches)
manOfTheMatchData = Object.entries(manOfTheMatchData)

 function findHeighestMom(manOfTheMatchData){
  let answer =   manOfTheMatchData.reduce((acc,ele)=>{
        let singArr = ele[1]
        for(let key in singArr){
            if(acc[ele[0]]){
                if(singArr[key]>acc[ele[0]]["times"]){
                    acc[ele[0]]["playername"] = key
                    acc[ele[0]]["times"]  = singArr[key]
                }
            //   console.log(singArr[key]);
              
               
            }
            else{
                acc[ele[0]]={
                  "playername": key,
                  "times": singArr[key]
                }
              }
            
            
        }
        
        return acc
        
          
     },{})
     console.log(answer);
     
 }


findHeighestMom(manOfTheMatchData)