const deliveries = require("../data/deliveries.json");
const matches = require("../data/matches.json");
const writeFile = require("../public/writefile/write-file");


function createbowlerdata(data){

     let profiledata = {}

    for(let key in data){
      
            let obj = data[key]
            
            if(obj["player_dismissed"]!=""){
                let batsman = obj["batsman"]
                let bowler =obj["bowler"]
                if(profiledata[bowler]){
                   if(profiledata[bowler][batsman])profiledata[bowler][batsman]++;
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
    return profiledata
}

let bowlerwicketdata = createbowlerdata(deliveries)

function findmostdismisial(bowlerwicketdatadata){
    let mostdismisial ={
        "no-of-wicket":0
        }
    for(let key in bowlerwicketdata){
       let singleobj = bowlerwicketdata[key]
       let bowlername = key
       let countofwicket =0
    for(let batsman in singleobj){
        // console.log(singleobj[batsman]);
        if(singleobj[batsman]>mostdismisial["no-of-wicket"]) {
            countofwicket = singleobj[batsman]

            mostdismisial = {
               [bowlername ]:batsman,
                "no-of-wicket" : countofwicket
            }
        }
   

        
        
    }
   
    
   
    
        
    }
    return mostdismisial
}
let mostdismisial= findmostdismisial(bowlerwicketdata)



writeFile("8-highest-number-of-dismisial.json",JSON.stringify(mostdismisial,null,3))