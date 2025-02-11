import { writeFile } from 'node:fs';


export default function writefile(pathname,data){
    writeFile(`../public/output/${pathname}`,JSON.stringify(data,null,3), (err)=>{
        (err) ? console.log("something is worked"): console.log("Done");   
    })
}

