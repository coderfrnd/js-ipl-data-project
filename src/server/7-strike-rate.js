const deliveries = require("../data/deliveries.json");
const matches = require("../data/matches.json");
const writeFile = require("../public/writefile/write-file");

function matchidseason(data) {
  let answer = {};
  for (let key in data) {
    let year = data[key]["season"];
    if (answer[year]) {
      answer[year]["matchid"].push(data[key]["id"]);
    } else {
      answer[year] = {
        matchid: [],
      };
    }
  }
  return answer;
}
let seasondata = matchidseason(matches);

// console.log(answer);
function totalbowlandrun(seasondata, deliverdata) {
  for (let key in seasondata) {
    let year = key;
    let matchid = seasondata[key]["matchid"];
    //    console.log(matchid);

    for (let key in deliverdata) {
      let id = deliverdata[key]["match_id"];
      let playername = deliverdata[key]["batsman"];
      if (matchid.includes(id)) {
        if (seasondata[year][playername]) {
          seasondata[year][playername]["total-runs"] += parseFloat(
            deliverdata[key]["batsman_runs"]
          );
          if (
            deliverdata[key]["wide_runs"] == 0 ||
            deliverdata[key]["noball_runs"] == 0
          ) {
            seasondata[year][playername]["total-bowl"]++;
          }
        } else {
          let totalbowl = 1;
          if (
            deliverdata[key]["wide_runs"] > 0 ||
            deliverdata[key]["noball_runs"] > 0
          ) {
            totalbowl = 0;
          }
          seasondata[year][playername] = {
            "total-runs": parseFloat(deliverdata[key]["batsman_runs"]),
            "total-bowl": totalbowl,
          };
        }
      }
    }
  }
}

totalbowlandrun(seasondata, deliveries);

function deletematchid(data) {
  for (let key in data) {
    for (let val in data[key]) {
      delete data[key].matchid;

      // console.log(data[key]);
    }
  }
  return data;
}

seasondata = deletematchid(seasondata);

function strikeratecal(data) {
  // let strikerate = []
  for (let year in data) {
    let playerinformationobject = data[year];
    for (let playerinformation in playerinformationobject) {
      let run = data[year][playerinformation]["total-runs"];
      let bowl = data[year][playerinformation]["total-bowl"];
      let rate = run / bowl;
      rate = rate * 100;
      // For Round of two digit
      rate = rate.toFixed(2);

      data[year][playerinformation] = {
        strikerate: rate,
      };
    }
    // console.log(playerinformationobject);
  }
}

strikeratecal(seasondata);

let playerstrike = {};

function playerobj(data) {
  for (let year in data) {
    for (let playername in data[year]) {
      if (playerstrike[playername]) {
        playerstrike[playername][year] = data[year][playername]["strikerate"];
      } else {
        playerstrike[playername] = {
          [year]: data[year][playername]["strikerate"],
        };
      }
    }
    // console.log(data[year]);
  }
}

playerobj(seasondata);
//    console.log(playerstrike);
//   console.log(seasondata);
writeFile(
  "7-strike-rate-per-season.json",
  JSON.stringify(playerstrike, null, 3)
);
