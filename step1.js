const fs = require('fs')

let filePath = process.argv[2]

function cat(filePath){
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
    })
}

cat(filePath);