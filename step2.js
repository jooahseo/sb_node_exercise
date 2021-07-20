const fs = require('fs');
const validUrl = require('valid-url');
const axios = require('axios');

async function webCat(url){
    try{
        const res = await axios.get(url)
        if(res.data.length > 100){
            console.log(res.data.substr(0,100), "...")
        }else{
            console.log("res.data")
        }
    }catch(err){
        console.error(`Error fetching ${url}: \n${err}`)
        process.exit(1)
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', (err,data)=>{
        if(err){
            console.error("ERROR: ", err.message);
            process.exit(1)
        }
        console.log(data)
    })

}

if(process.argv.length>3){
    console.error("ERROR: Too many arguments.")
    process.exit(2)
}
else if(process.argv.length>2){
    let path = process.argv[2]
    if(validUrl.isUri(path)){
        webCat(path);
    }else{
        cat(path)
    }
}