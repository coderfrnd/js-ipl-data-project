const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");

function getMatchid(matches,year) {
  let matchIdDetails = [];
  for (let key in matches) {
    if (matches[key].season == year) {
      matchIdDetails.push(matches[key].id);
    }
  }
  return matchIdDetails;
}

function extraRunConceded(deliveryData,year) {
  let extraRun = {};
  let matchId = getMatchid(matches,year);
  for (let i = 0; i < deliveryData.length; i++) {
    let id = deliveryData[i].match_id;
    if (matchId.includes(id)) {
      if (extraRun[deliveryData[i].bowling_team]) {
        let convert = deliveryData[i].extra_runs;
        extraRun[deliveryData[i].bowling_team]["extraRun"] += Number(convert);
      } else {
        let convert = deliveryData[i].extra_runs;
        extraRun[deliveryData[i].bowling_team] = { extraRun: Number(convert) };
      }
    }
  }
  return extraRun;
}
let extraRunData = extraRunConceded(deliveries,2016);
writeFile(
  "3-extra-run-conceded-in-2016.json",
  JSON.stringify(extraRunData, null, 3)
);
