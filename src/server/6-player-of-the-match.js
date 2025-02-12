import {matches}  from './readfile/readfile.js'
import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';


function manofthematch(matchesdata){
     
  let data = matchesdata.reduce((acc,ele)=>{
        if(acc[ele.season]){
            if(acc[ele.season][ele.player_of_match]){
                acc[ele.season][ele.player_of_match]++;
            }
            else {
                acc[ele.season][ele.player_of_match] = 1
            }
        }
        else {
            acc[ele.season] = {
                [ele.player_of_match] : 1
            }
        }
        return acc
    },{})
    return data
}

        function findmostmanofthematch(){
            let data = manofthematch(matches)
             data = Object.entries(data)
            data =  data.reduce((acc,ele)=>{
                let singobj = ele[1]
                let mostmomatch =0 ;
                for(let key in singobj){
                  if(singobj[key]>mostmomatch){
                            acc[ele[0]] = {
                                [key] : singobj[key]
                            }
                            mostmomatch = singobj[key]
                  }                    
                }
                return acc

              },{})
           
             return data

        }

    writefile("6-player-of-the-match.json",findmostmanofthematch(matches))
