const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");
const fs = require("fs");
const writeFile = require("../data/writefile/write-file.js");

// function to counting the number of pom awards per season
function getPlayerOfTheMatchCount(data) {
  let playerMatchCounts = {};

  for (let match of data) {
    let season = match.season;
    let player = match.player_of_match;

    if (playerMatchCounts[season]) {
      if (playerMatchCounts[season][player]) {
        playerMatchCounts[season][player]++;
      } else {
        playerMatchCounts[season][player] = 1;
      }
    } else {
      playerMatchCounts[season] = {
        [player]: 1,
      };
    }
  }

  return playerMatchCounts;
}

let playerMatchCounts = getPlayerOfTheMatchCount(matches);


function getTopPlayersPerSeason(playerMatchCounts) {
  let topPlayers = {};

  for (let season in playerMatchCounts) {
    let seasonData = playerMatchCounts[season];
    topPlayers[season] = [];
    let highestCount = 0;

    for (let player in seasonData) {
      let count = seasonData[player];
      if (count >= highestCount) {
        if (count === highestCount) {
          topPlayers[season].push(player);
        } else {
          topPlayers[season] = [player];
        }
        highestCount = count;
      }
    }
  }

  return topPlayers;
}

let topPlayersPerSeason = getTopPlayersPerSeason(playerMatchCounts);

// Writing the top players of each season to a file
writeFile("6-player-of-the-match.json", JSON.stringify(topPlayersPerSeason, null, 3));
