import { matches } from "./readfile/readfile.js";
import { delivery } from "./readfile/readfile.js";
import writefile from "./writefile/write-file.js";

function collectMatchid(matchesdata) {
  let matchid = matchesdata.reduce((acc, ele) => {
    if (ele.season == "2015") {
      acc.push(ele.id);
    }
    return acc;
  }, []);

  return matchid;
}

function topTenEconomicalBowler(deliverydata) {
  let id = collectMatchid(matches);
  let ans = deliverydata.reduce((bowlerInfo, ele) => {
    if (id.includes(ele.match_id)) {
      let totalrun = ele.total_runs - ele.bye_runs - ele.penalty_runs;
      totalrun = parseInt(totalrun);
      let bowl = 1;
      if (ele.noball_runs > 0 || ele.wide_runs > 0) bowl = 0;
      if (bowlerInfo[ele.bowler]) {
        bowlerInfo[ele.bowler]["total-run"] += totalrun;
        bowlerInfo[ele.bowler]["total-bowl"] += bowl;
      } else {
        bowlerInfo[ele.bowler] = {
          "total-run": totalrun,
          "total-bowl": bowl,
        };
      }
    }
    return bowlerInfo;
  }, {});
  return ans;
}

function economyRateCalculate() {
  let requireddata = topTenEconomicalBowler(delivery);
  for (let key in requireddata) {
    let totalrun = requireddata[key]["total-run"];
    let totalbowl = requireddata[key]["total-bowl"];

    let economyerate = (totalrun * 6) / totalbowl;
    economyerate = economyerate.toFixed(2);
    requireddata[key] = economyerate;
  }

  const sortedData = Object.entries(requireddata)
    .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
    .map(([player, economy]) => ({ player, economy }));

  return sortedData;
}

let toptenEconomicalBowlerdata = economyRateCalculate().slice(0, 10);

writefile("4-economical-bowler.json", toptenEconomicalBowlerdata);
