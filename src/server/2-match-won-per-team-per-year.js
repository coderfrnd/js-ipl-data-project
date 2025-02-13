import {matches}  from './readfile/readfile.js'
import writefile from './writefile/write-file.js';


function matchwonperyear(matchdata){
    let perTeam = matchdata.reduce((perTeam,ele)=>{ 
          if(perTeam[ele.winner]){
            if(perTeam[ele.winner][ele.season])perTeam[ele.winner][ele.season]++;
            else {
                perTeam[ele.winner][ele.season] =1 
            }
          }
          else {
            perTeam[ele.winner] = {
                [ele.season]:1
            }
          }
              return perTeam
    },{})
    return perTeam
}

let winnerteam = matchwonperyear(matches)
// console.log(winnerteam);

writefile("2-match-won-per-team-per-year.json",winnerteam)

