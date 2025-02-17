const matches = require("../data/matches.json");
const writeFile = require("../data/writefile/write-file.js");

function numberOfMatch(matchData) {
  let countMatch = {};
  for (let key in matchData) {
    if (countMatch[matchData[key].season]) countMatch[matchData[key].season]++;
    else countMatch[matchData[key].season] = 1
  }
  return countMatch;
}

let countMatch = numberOfMatch(matches);
writeFile("1-match-per-season.json", JSON.stringify(countMatch, null, 3));
