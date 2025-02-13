import { matches } from "./readfile/readfile.js";
import { delivery } from "./readfile/readfile.js";
import writefile from "./writefile/write-file.js";

function collectmatchid(matchesdata) {
  let matchid = matchesdata.reduce((acc, ele) => {
    if (ele.season == "2016") {
      acc.push(ele.id);
    }
    return acc;
  }, []);

  return matchid;
}

function calculateextrarun(deliverydata) {
  let matchid = collectmatchid(matches);

  let perteamcal = deliverydata.reduce((extraRun, singobj) => {
    let id = singobj.match_id;
    if (matchid.includes(id)) {
      let name = singobj.bowling_team;
      let run = singobj.extra_runs;
      run = parseInt(run);
      if (extraRun[name]) {
        extraRun[name]["extra-runs"] += run;
      } else {
        extraRun[name] = {
          "extra-runs": run,
        };
      }
    }
    return extraRun;
  }, {});
  return perteamcal;
}
let extrauns = calculateextrarun(delivery);
// console.log(a);
writefile("3-extra-run-conceded-in-2016.json", extrauns);
