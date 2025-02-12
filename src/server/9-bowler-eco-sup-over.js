import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';


function superOverEconomical(deliverdata){
    let runAndBowldata = deliverdata.reduce((acc,ele)=>{
            if(ele.is_super_over !== "0"){
                let totalrun = ele.total_runs
                     totalrun = parseFloat(totalrun)
                        if(acc[ele.bowler]){
                            acc[ele.bowler]["total-run"]+= totalrun
                            acc[ele.bowler]["total-bowl"]++;
                        }
                        else{
                            acc[ele.bowler] = {
                              "total-run" : totalrun,
                              "total-bowl" :1 
                            }
                        }
            }
            return acc
    },{})

   return runAndBowldata      
}


   function calculateEconomy(){
           let runAndBowldata = superOverEconomical(delivery)

           runAndBowldata=Object.entries(runAndBowldata)
           let max=10000;
           
         runAndBowldata =  runAndBowldata.reduce((acc,ele)=>{
            let totalrun = ele[1]["total-run"]
            let totalbowl = ele[1]["total-bowl"]
             let economyrate = totalrun/totalbowl
                economyrate=economyrate*6
                economyrate=economyrate.toFixed(2)
                economyrate =parseFloat(economyrate)
                   if(max > economyrate){
                    max = economyrate
                    acc = {
                      [ele[0]]: economyrate
                    }

                   } 
                if(economyrate<max){
                  max =  economyrate
                }
                   return acc
         },{})
         return runAndBowldata

   }



    writefile("9-best-economy-in-super-over.json",calculateEconomy())


