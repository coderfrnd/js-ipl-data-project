const matches = require("../data/writefile/write-file.js");
const writeFile = require("../data/writefile/write-file.js");

function matchWonPerYear(matchData) {
  let resultPerYear = {};
  for (let key in matchData) {
    let winner = matchData[key]["winner"];
    let season = matchData[key]["season"];
    season = season.toString();
    if (resultPerYear[winner]) {
      if (resultPerYear[winner][season]) resultPerYear[winner][season]++;
      else resultPerYear[winner][season] = 1;
    } else {
      resultPerYear[winner] = { [season]: 1 };
    }
  }
  return resultPerYear;
}

let resultPerYear = matchWonPerYear(matches);
writeFile(
  "2-match-won-per-team-per-year.json",
  JSON.stringify(resultPerYear, null, 2)
);
