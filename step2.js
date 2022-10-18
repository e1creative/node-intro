const fs = require('fs')
const axios = require('axios')

let path = process.argv[2]

function cat(filePath){
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

const substr1 = "http://"
const substr2 = "https://"

if (path.includes(substr1) || path.includes(substr2)) {
    webCat(path);
} else {
    cat(path);
}