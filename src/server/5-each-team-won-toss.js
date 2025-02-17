const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const writeFile = require("../data/writefile/write-file.js");



function tossAndMatchWinnerTeam(data) {
  let answer = {};
  for (let key in data) {
    if (data[key].toss_winner == data[key].winner) {
      if (answer[data[key].toss_winner]) {
        answer[data[key].toss_winner]++;
      } else answer[data[key].toss_winner] = 1;
    }
  }
}

let teamData = tossAndMatchWinnerTeam(matches);

writeFile("5-each-team-won-toss.json", JSON.stringify(teamData, null, 3));


