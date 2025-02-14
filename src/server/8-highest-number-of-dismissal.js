const deliveries = require("../data/deliveries.json");
const matches = require("../data/matches.json");
const writeFile = require("../data/writefile/write-file.js");

function createbowlerdata(data) {
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

let bowlerWicketData = createbowlerdata(deliveries);

function findmostdismisial(bowlerWicketData) {
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
let mostdismisial = findmostdismisial(bowlerWicketData);

writeFile(
  "8-highest-number-of-dismisial.json",
  JSON.stringify(mostdismisial, null, 3)
);
