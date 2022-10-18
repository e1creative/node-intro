const fs = require('fs')
const axios = require('axios')

const substr1 = "http://"
const substr2 = "https://"

if (process.argv[2] == "--out"){
    if (!process.argv[3] || !process.argv[4]){
        console.log("Please provide an output file path, and an input file path or URL.")
        process.exit(1);
    }

    let outputPath = process.argv[3];
    let inputPath = process.argv[4];

    if (inputPath.includes(substr1) || inputPath.includes(substr2)) {
        async function writeFromInput(){
            try {
                let resp = await axios.get(inputPath)
                fs.writeFile(outputPath, resp.data, {encoding: 'utf-8', flag: 'a'}, (err) => {
                    if (err) {
                        console.log("ERROR: ",err)
                        process.kill(1)
                    }
                    console.log("Successfully wrote to the file!")
                })
            } catch (e) {
                console.log(e)
                process.exit(1)
            }
        }
        writeFromInput();
    } else {
        fs.readFile(inputPath, 'utf-8', (err,data) => {
            if (err){
                console.log("ERROR: ", err)
                process.kill(1)
            }
            fs.writeFile(outputPath, data, {encoding: 'utf-8', flag: 'a'}, (err) => {
                if (err) {
                    console.log("ERROR: ",err)
                    process.kill(1)
                }
                console.log("Successfully wrote to the file!")
            })
    
        })
    }

} else {

    let path = process.argv[2]

    function cat(filePath){
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log("ERROR: ", err)
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

    if (path.includes(substr1) || path.includes(substr2)) {
        webCat(path);
    } else {
        cat(path);
    }
}


