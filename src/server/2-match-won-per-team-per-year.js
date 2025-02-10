
const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const writeFile = require('../public/writefile/write-file.js')



function matchwonperyear(data){
    let resultperyear ={}
    for(let key in data){

        let winner = data[key]["winner"]
        let season = data[key]["season"]
        // console.log(season);
        season=season.toString()  
        //  Here Converting num into string so easy for counting 
     if( resultperyear[winner]){
        // Here if team name object present then check that season exist or not if not then else condition create and intialize and give count one and if present then increase the count just in if condition
        if( resultperyear[winner][season])  resultperyear[winner][season]++;
        else resultperyear[winner][season]=1
     }
   else{
    // If that winner team is not present then create a that team name object 
    resultperyear[winner]= {[season] : 1}

   }
      
       
        
    }
    return resultperyear
}

let resultperyear = matchwonperyear(matches)
// let x= matchwonperyear(matches)
// console.log(resultperyear["Delhi Daredevils"]["2016"]);
// console.log(resultperyear);


writeFile("2-match-won-per-team-per-year.json",JSON.stringify(resultperyear,null,2))