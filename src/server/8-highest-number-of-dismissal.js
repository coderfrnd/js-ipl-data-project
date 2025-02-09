const deliveries = require("../data/deliveries.json");
const matches = require("../data/matches.json");
const writeFile = require("../public/writefile/write-file");


function createbowlerdata(data){

     let profiledata = {}

    for(let key in data){
          for( let bowlername in data[key] ){
            let obj = data[key]
            
            if(obj["player_dismissed"]!=""){
                let batsman = obj["batsman"]
                let bowler =obj["bowler"]
                if(profiledata[bowler]){
                   if(profiledata[bowler][batsman]) profiledata[bowler][batsman]++;
                   else {
                    profiledata[bowler][batsman] = 1 
                   }
                }
                else{
                    profiledata[bowler] = {
                        [batsman] : 1
                    }
                }
            }

            
          }
          
    }
    return profiledata

}

let answer = createbowlerdata(deliveries)
console.log(answer);
