import { readFile, readFileSync } from 'node:fs';


function readfile(filepath){
     let val;

 val=readFileSync(`${filepath}`,'utf-8');
 
  val=JSON.parse(val)
  
  return val
}
export let matches = readfile("../data/matches.json")
export let delivery = readfile("../data/deliveries.json")
// matches = Object.entries(matches)
// matches = Object.values(matches); // Extract values into an array


// // export default delivery  
// export default matches