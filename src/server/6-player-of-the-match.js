const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');
const writeFile = require('../public/writefile/write-file.js')



function playerofthematch(data){
    let answer ={}

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
       return answer
}

let answer = playerofthematch(matches)




          function findingperseason(data){
            let playersname ={}
            for(let key in data){
  
                let find = data[key]
                     playersname[key] ={}
                     let a=0; 
                 for(let val in find){
                  if(find[val]>=a){
                     if(find[val]==a){
                         playersname[key].push(val)
                     }
                     else{
                      playersname[key] = [val]
                     }
                      a=find[val];
                  }   
                 }
                    
              }
              return playersname

          }

          let playersname = findingperseason(answer)







// fs.writeFile('../public/output/6-player-of-the-match.json',JSON.stringify(playersname,null,3),(err)=>{
//     (err) ? console.log("Here Some Problem",err) : console.log("Everything is fine");
// })

writeFile("6-play-of-the-match.json",JSON.stringify(playersname,null,3))