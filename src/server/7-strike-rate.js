import { matches } from "./readfile/readfile.js";
import { delivery } from "./readfile/readfile.js";
import writefile from "./writefile/write-file.js";

function findMatchIdandSeason(matchdata) {
  let seasondata = matchdata.reduce((yearAndMatch, ele) => {
    if (yearAndMatch[ele.season]) {
      yearAndMatch[ele.season].push(ele.id);
    } else {
      yearAndMatch[ele.season] = [];
      yearAndMatch[ele.season].push(ele.id);
    }

    return yearAndMatch;
  }, {});
  return seasondata;
}

function findStrikeRate(deliverydata) {
  let seasonData = findMatchIdandSeason(matches);
  let data = deliverydata.reduce((strikeRate, ele) => {
    let id = ele.match_id;
    let batsmanName = ele.batsman;
    let totalrun = ele.batsman_runs;
    let totalbowl = 1;
    if (ele.wide_runs > 0 || ele.noball_runs > 0) totalbowl = 0;
    totalrun = parseFloat(totalrun);
    for (let key in seasonData) {
      if (seasonData[key].includes(id)) {
        if (strikeRate[batsmanName]) {
          if (strikeRate[batsmanName][key]) {
            strikeRate[batsmanName][key]["total-run"] += totalrun;
            strikeRate[batsmanName][key]["total-bowl"] += totalbowl;
          } else {
            strikeRate[batsmanName][key] = {
              "total-run": totalrun,
              "total-bowl": totalbowl,
            };
          }
        } else {
          strikeRate[batsmanName] = {
            [key]: {
              "total-run": totalrun,
              "total-bowl": totalbowl,
            },
          };
        }

        break;
      }
    }

    return strikeRate;
  }, {});
  return data;
}
    
function calculateStrikeRate(){
    let runAndBowlData = findStrikeRate(delivery)
    let strikeRateperplayer = []
    
   
     for(let key in runAndBowlData){
             let perSeasonData = Object.entries(runAndBowlData[key])
    let  data =   perSeasonData.reduce((singobj,ele)=>{
            
            let totalrun =    ele[1]["total-run"]
            let totalbowl = ele[1]["total-bowl"]
            let strike = totalrun*6/totalbowl
            strike = strike.toFixed(2)
            if(singobj[key]){
              singobj[key][ele[0]] = strike
            }
            else{
              singobj[key] = {
                [ele[0]] : strike
              }
            }
            return singobj
            
            },{})
            strikeRateperplayer.push(data)        
     }
return strikeRateperplayer
}
calculateStrikeRate(delivery)
writefile("7-strike-rate-per-season.json",calculateStrikeRate(delivery))