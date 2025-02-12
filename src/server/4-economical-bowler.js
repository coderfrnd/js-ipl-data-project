import {matches}  from './readfile/readfile.js'
import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';

function collectmatchid(matchesdata){
  let matchid = matchesdata.reduce((acc,ele)=>{
     if(ele.season == '2015'){
       acc.push(ele.id)
     }
     return acc
  },[])

  return matchid
}


function topteneconomicalbowler(deliverydata){
  let id = collectmatchid(matches)
   let ans =  deliverydata.reduce((obj,ele)=>{
       if(id.includes(ele.match_id)){
        let totalrun = ele.total_runs - ele.bye_runs - ele.penalty_runs
        totalrun=parseInt(totalrun)
        let bowl = 1;
        if(ele.noball_runs > 0 || ele.wide_runs>0)bowl=0;
             if(obj[ele.bowler]){
                 obj[ele.bowler]["total-run"]+=totalrun
                 obj[ele.bowler]["total-bowl"]+=bowl
             }
             else{
              obj[ele.bowler]={
                "total-run":totalrun,
                "total-bowl":bowl
              }
             }
       }
           return obj
     },{})
return ans
}

       function economyratecalculate(){
        let requireddata = topteneconomicalbowler(delivery)
      for(let key in requireddata){
        let totalrun = requireddata[key]["total-run"]
        let totalbowl = requireddata[key]["total-bowl"]

           let economyerate = (totalrun*6)/totalbowl
           economyerate=economyerate.toFixed(2)
         requireddata[key] = economyerate
      }

      const sortedData = Object.entries(requireddata)
  .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1])) // Convert values to numbers and sort
  .map(([player, economy]) => ({ player, economy }));

     return sortedData
       }

let topteneconomicalbowlerdata = economyratecalculate().slice(0,10)


writefile("4-economical-bowler.json",topteneconomicalbowlerdata)