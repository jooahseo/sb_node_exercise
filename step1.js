const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err,data)=>{
        if(err){
            console.log("ERROR: ", err.message);
            process.exit(1)
        }
        console.log(data)
    })

}
if(process.argv.length>3){
    console.log("ERROR: Too many arguments.")
    process.exit(2)
}
else if(process.argv.length>2){
    cat(process.argv[2])
}