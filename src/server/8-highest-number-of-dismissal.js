const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");

function createBowlerData(data) {
  let profiledata = {};

  for (let key in data) {
    let obj = data[key];

    if (obj["player_dismissed"] != "") {
      let batsman = obj["batsman"];
      let bowler = obj["bowler"];
      if (profiledata[bowler]) {
        if (profiledata[bowler][batsman]) profiledata[bowler][batsman]++;
        else {
          profiledata[bowler][batsman] = 1;
        }
      } else {
        profiledata[bowler] = {
          [batsman]: 1,
        };
      }
    }
  }
  return profiledata;
}

let bowlerWicketData = createBowlerData(deliveries);

function findMostDismisial(bowlerWicketData) {
  let mostdismisial = {
    "no-of-wicket": 0,
  };
  for (let key in bowlerWicketData) {
    let singleobj = bowlerWicketData[key];
    let bowlername = key;
    let countofwicket = 0;
    for (let batsman in singleobj) {
      // console.log(singleobj[batsman]);
      if (singleobj[batsman] > mostdismisial["no-of-wicket"]) {
        countofwicket = singleobj[batsman];

        mostdismisial = {
          [bowlername]: batsman,
          "no-of-wicket": countofwicket,
        };
      }
    }
  }
  return mostdismisial;
}
let mostDismisial = findMostDismisial(bowlerWicketData);

writeFile(
  "8-highest-number-of-dismisial.json",
  JSON.stringify(mostDismisial, null, 3)
);
