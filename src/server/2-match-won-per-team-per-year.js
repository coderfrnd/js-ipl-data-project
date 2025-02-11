import {matches}  from './readfile/readfile.js'
import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';


function matchwonperyear(matchdata){
    let ans = matchdata.reduce((obj,ele)=>{ 
          if(obj[ele.winner]){
            if(obj[ele.winner][ele.season])obj[ele.winner][ele.season]++;
            else {
                obj[ele.winner][ele.season] =1 
            }
          }
          else {
            obj[ele.winner] = {
                [ele.season]:1
            }
          }
              return obj
    },{})
    return ans
}

let winnerteam = matchwonperyear(matches)
// console.log(winnerteam);

writefile("2-match-won-per-team-per-year.json",winnerteam)

