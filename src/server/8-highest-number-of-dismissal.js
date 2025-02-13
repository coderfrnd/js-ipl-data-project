import {delivery} from './readfile/readfile.js'
import writefile from './writefile/write-file.js';

function  highestnumofwicket(deliverdata){
       let data = deliverdata

     data = deliverdata.reduce((acc,ele)=>{

           if(ele.player_dismissed !== ""){
                 if(acc[ele.bowler]){
                      if(acc[ele.bowler][ele.batsman]){
                        acc[ele.bowler][ele.batsman]++
                      }
                      else {
                        acc[ele.bowler][ele.batsman] = 1
                      }
                 }
                 else{
                    acc[ele.bowler] = {
                        [ele.batsman] : 1
                    }
                 }
           }
       return acc
       },{})
    return data

       
}

          function highestonly(){
            let bowlerdata = highestnumofwicket(delivery)
              bowlerdata = Object.entries(bowlerdata) 
              let max =0
                bowlerdata =   bowlerdata.reduce((acc,ele)=>{
                    let singobj = ele[1] 
                   
                     for(let key in singobj){
                        if(singobj[key]>max){
                            max=singobj[key]
                             acc = {
                                [ele[0]] : {
                                    "name" : key,
                                     "total-wicket":max
                                }
                             }
                             
                        }
                     }
                     return acc
                   },{})
                return bowlerdata
                   

          }
       
  writefile("8-highest-number-of-dismisial.json",highestonly())