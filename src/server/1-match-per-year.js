import writeFile from './writefile/write-file.js';
import {matches}  from './readfile/readfile.js'
import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';





function matchesplayperyear(data){
     console.log(typeof data);
     
  let ans =  data.reduce((arr,element) => {
          if(arr[element.season]){
               arr[element.season]++;
          }
          else{
               arr[element.season] = 1
          }
      return arr
     },{})
     return ans
}
console.log(Array.isArray(matches));

 let seasonmatchdata = matchesplayperyear(matches)
writefile("1-match-per-season.json",seasonmatchdata)

