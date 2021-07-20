const fs = require('fs');
const validUrl = require('valid-url');
const axios = require('axios');

function handleOut(content, out){
    if(out){
        fs.writeFile(out, content,'utf8',err => {
            if(err){
                console.log(`Couldn't write ${out}: \n`, err);
                process.exit(1);
            }
        });
    }else{
        console.log(content);
    }
}

async function webCat(url, out){
    try{
        const res = await axios.get(url)
        handleOut(res.data, out)
    }catch(err){
        console.error(`Error fetching ${url}: \n${err}`)
        process.exit(1)
    }
}

function cat(path, out){
    fs.readFile(path, 'utf8', (err,data)=>{
        if(err){
            console.error("ERROR: ", err.message);
            process.exit(1);
        }
        handleOut(data, out);
    })
}

let args = process.argv.slice(2);
let out;
let path;

if(args[0]=="--out"){
    out = args[1];
    path = args[2];
}else{
    path = args[0]
}

if(validUrl.isUri(path)){
    webCat(path, out);
}
else{
    cat(path, out);
}