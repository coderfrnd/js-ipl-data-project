const matches = require("../data/matches.json");
const deliveries = require("../data/deliveries.json");

const writeFile = require("../data/writefile/write-file.js");

let matchid = matches
  .filter((info) => info.season == 2015)
  .map((info) => {
    return info.id;

    // Here just counting matchid means which match happen in 2015 there match id  
  });
// console.log(matchid);

function economialbowler(data) {
  let bowlersdata = {};

  matchid.forEach((num) => {
    for (let key in data) {
        // Here we are checking like matchid and num are equal or not 
      if (data[key].match_id == num) {
        let bowler = data[key].bowler;
        let totalrun =
          data[key].total_runs - data[key].legbye_runs - data[key].penalty_runs;
        //   Here some runs which is not count in bowler account so that are subtract from total run
        totalrun = Number(totalrun); // Converting string num into numbers
        // If that bowler name object already present so just add run in that object 
        if (bowlersdata[bowler]) {
          bowlersdata[bowler]["totalruns"] += totalrun;
                // For economical data only legal delivery counted as bowl and no-bowl and wide-run count but bowl not
          if (data[key].ball < 7) bowlersdata[bowler]["totalbowls"]++;
        } else {
            // Bowler name object not present bcz first time bowler name come so create new object of bowler name  
          bowlersdata[bowler] = {
            totalruns: totalrun,
            totalbowls: 1,
          };
        }
      }
    }
  });
  return bowlersdata;
}

let bowlersdata = economialbowler(deliveries);

// Calculating Economical rate converter here
function economicalconverter(data) {
  for (let key in data) {
    data[key].totalruns = data[key].totalruns * 6;
    let x = data[key].totalruns;

    x = x / data[key].totalbowls;
    y = data[key].totalbowls;
    // console.log(y);
// Only two digit number are allowed 
    bowlersdata[key]["economy"] = parseFloat(x.toFixed(2));
  }
}

economicalconverter(bowlersdata);


// Using Object entries for converting object into arrays so we can perform sort action
let economialdata = Object.entries(bowlersdata);
// console.log(economialdata);
// Here Sorting action performed to choose top 10 bowler acc to economy
economialdata = economialdata
  .sort((a, b) => a[1].economy - b[1].economy)
  .slice(0, 10);

writeFile("4-economical-bowler.json", JSON.stringify(economialdata, null, 3));
