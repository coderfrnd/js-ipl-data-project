const deliveries = require("../data/deliveries.json");
const matches = require("../data/matches.json");
const writeFile = require("../data/writefile/write-file.js");


function findonlysuperoverobject(data){
    let superoverobj = []
    for(let key in data){
        if(data[key]["is_super_over"]>0){
                        superoverobj.push(data[key])   
        }
    }
    return superoverobj
}

let superoverarray = findonlysuperoverobject(deliveries)
// console.log(x.length);


function runandbowldata(superoverarray){
    let superoverfinal ={}
    for(let i=0; i<superoverarray.length; i++){
        let singleobj = superoverarray[i]
        let totalrun = superoverarray[i]["total_runs"]
                 totalrun = parseFloat(totalrun)
                 totalbowl = 1;
             
                 // if(superoverarray[i]["penalty_runs"]>0)
 
        if(superoverfinal[singleobj["bowler"]]){
               superoverfinal[singleobj["bowler"]]["total-run"]+= totalrun
               superoverfinal[singleobj["bowler"]]["total-bowl"]++;
        }
        else{
         superoverfinal[singleobj["bowler"]] = {
             "total-run":totalrun,
             "total-bowl": 1
         }
        }
 
 }
 return superoverfinal
}

let superoverfinal= runandbowldata(superoverarray)


   function economycal(superoverfinal){
    let besteconomy = 10000
    let bestbowler={}
    for(let bowlername in superoverfinal){
         
        let run = superoverfinal[bowlername]["total-run"]
        let bowl = superoverfinal[bowlername]["total-bowl"]

        run = parseFloat(run)
        bowl = parseFloat(bowl)
        // console.log(run , bowl);
        
        let economy = run/bowl;
        

        economy = economy.toFixed(2)*6
      
        
        if(economy < besteconomy){
            besteconomy=economy;
              bestbowler = {
                [bowlername] : besteconomy
              }
        }
       
        
       
    }
    // console.log(bestbowler);
    
    return bestbowler
   }

  let bestbowler= economycal(superoverfinal)
//   console.log(bestbowler);

writeFile("9-best-economy-in-super-over.json",JSON.stringify(bestbowler,null,3))
  



// console.log(superoverfinal);



