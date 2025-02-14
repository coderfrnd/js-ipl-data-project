const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");

function getmatchid(matches) {
    let matchIdDetails = []
    for(let key in matches){
   if(matches[key].season == '2016'){
    matchIdDetails.push(matches[key].id)
   } 
    }
    return matchIdDetails 
}
// This is a function which is used to count extra run conceded it takes two parameter first one matchperball dataa and second one is matchid which we extract from previous function getmatchid()

function extrarunconceded(data, matchid) {
  let extrarun = {}; // Intialize empty object to store data of extra-run
let matchId = getmatchid(matches)
  matchId.forEach((num) => {
    for (let key in data) {
      if (data[key].match_id == num) {
        if (extrarun[data[key].bowling_team]) {
          let convert = data[key].extra_runs;
          extrarun[data[key].bowling_team]["extrarun"] += Number(convert);
          // console.log(extrarun[data[key].bowling_team]);
        } else {
          let convert = data[key].extra_runs;
          extrarun[data[key].bowling_team] = { extrarun: Number(convert) };
        }
      }
    }
  });
  return extrarun;
}
let matchid = getmatchid(matches);
// console.log(matchid);

let extrarundata = extrarunconceded(deliveries, matchid);
// console.log(extrarun);

writeFile(
  "3-extra-run-conceded-in-2016.json",
  JSON.stringify(extrarundata, null, 3)
);
