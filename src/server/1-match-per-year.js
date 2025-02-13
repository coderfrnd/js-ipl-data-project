import {matches}  from './readfile/readfile.js'
import writefile from './writefile/write-file.js';





function matchesPlayperYear(data){
   
  let numberOfMatch =  data.reduce((numberOfMatch,element) => {
          if(numberOfMatch[element.season]){
               numberOfMatch[element.season]++;
          }
          else{
               numberOfMatch[element.season] = 1
          }
      return numberOfMatch
     },{})
     return numberOfMatch
}

writefile("1-match-per-season.json",matchesPlayperYear(matches))

