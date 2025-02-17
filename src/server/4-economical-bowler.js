const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");

function matchIds(matches,year) {
  let matchIdDetails = [];
  for (let key in matches) {
    if (matches[key].season == year) {
      matchIdDetails.push(matches[key].id);
    }
  }
  return matchIdDetails;
}

function economialBowler(deliveryData,year) {
  let matchId = matchIds(matches,year);
  let bowlerData = {};
  for (let i = 0; i < deliveryData.length; i++) {
    let id = deliveryData[i].match_id;
    if (matchId.includes(id)) {
      let bowler = deliveryData[i].bowler;
      let totalrun =
        deliveryData[i].total_runs -
        deliveryData[i].legbye_runs -
        deliveryData[i].penalty_runs;
      totalrun = Number(totalrun);
      if (bowlerData[bowler]) {
        bowlerData[bowler]["totalruns"] += totalrun;
        if (deliveryData[i].ball < 7) bowlerData[bowler]["totalbowls"]++;
      } else {
        bowlerData[bowler] = {
          totalruns: totalrun,
          totalbowls: 1,
        };
      }
    }
  }
  return bowlerData;
}
let bowlersData = economialBowler(deliveries,2016);
function economicalConverter(data) {
  for (let key in data) {
    data[key].totalruns = data[key].totalruns * 6;
    let x = data[key].totalruns;
    x = x / data[key].totalbowls;
    y = data[key].totalbowls;
    bowlersData[key]["economy"] = parseFloat(x.toFixed(2));
  }
}

economicalConverter(bowlersData);
let economialData = Object.entries(bowlersData);

economialData = economialData
  .sort((a, b) => a[1].economy - b[1].economy)
  .slice(0, 10);

writeFile("4-economical-bowler.json", JSON.stringify(economialData, null, 3));
