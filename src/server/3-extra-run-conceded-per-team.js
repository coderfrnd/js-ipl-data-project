const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");

function getMatchid(matches) {
    let matchIdDetails = []
    for(let key in matches){
   if(matches[key].season == '2016'){
    matchIdDetails.push(matches[key].id)
   } 
    }
    return matchIdDetails 
}
// This is a function which is used to count extra run conceded it takes two parameter first one matchperball dataa and second one is matchid which we extract from previous function getmatchid()

function extraRunConceded(data) {
  let extraRun = {}; // Intialize empty object to store data of extra-run
let matchId = getMatchid(matches)
  matchId.forEach((num) => {
    for (let key in data) {
      if (data[key].match_id == num) {
        if (extraRun[data[key].bowling_team]) {
          let convert = data[key].extra_runs;
          extraRun[data[key].bowling_team]["extraRun"] += Number(convert);
        } else {
          let convert = data[key].extra_runs;
          extraRun[data[key].bowling_team] = { extraRun: Number(convert) };
        }
      }
    }
  });
  return extraRun;
}
let extraRunData = extraRunConceded(deliveries);
writeFile(
  "3-extra-run-conceded-in-2016.json",
  JSON.stringify(extraRunData, null, 3)
);
