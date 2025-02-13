import {matches}  from './readfile/readfile.js'
import writefile from './writefile/write-file.js';

function matchwonandtosswon(matchdata){
 let tossandmatchwondata =  matchdata.reduce((acc,ele)=>{
        if(ele.toss_winner == ele.winner){
            if(acc[ele.toss_winner]) {
                acc[ele.toss_winner]++;
            }
            else {
               acc[ele.toss_winner] = 1
            }
          
        }
        return acc
    },{})

    return tossandmatchwondata
}
let tossandmatchwondata = matchwonandtosswon(matches)
writefile("5-each-team-won-toss.json",tossandmatchwondata)

