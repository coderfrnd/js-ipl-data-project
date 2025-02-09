const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');

let matchid = matches.filter((info) => info.season == 2015).map((info) => {
   return info.id
})


let answer = {}

function economialbowler(data){

    matchid.forEach((num)=>{
       for(let key in data){
        if(data[key].match_id == num){
            let bowler =  data[key].bowler
            let totalrun = data[key].total_runs - data[key].legbye_runs- data[key].penalty_runs;
                 totalrun = Number(totalrun)
            if(answer[bowler]){
            
                 
                answer[bowler]["totalruns"] += totalrun;

                if(data[key].ball<7)  answer[bowler]["totalbowls"]++;
                

            }
            else {
                answer[bowler] = {
                    totalruns : totalrun ,
                    totalbowls : 1
                }
            }
           
            
        }
       }
    })

}

economialbowler(deliveries)


function equalize (data){
    for(let key in data){
        data[key].totalruns =  (data[key].totalruns)*6;
         let x =  data[key].totalruns

         x=x/data[key].totalbowls
         y = data[key].totalbowls;
        // console.log(y);
        
        

          answer[key]["economy"] = parseFloat(x.toFixed(2))
         
    }
}

equalize(answer)

  let economialdata = Object.entries(answer)

 economialdata = economialdata.sort((a,b)=> a[1].economy -b[1].economy).slice(0,10)


// console.log(typeof economialdata)
// console.log(economialdata);

fs.writeFile('../public/output/top-ten-economical-bowler.json', JSON.stringify(economialdata,null,3),(err)=>{
    (err) ? console.log("There is some error") : console.log("GOOD WORK DONE");
    
    
})
