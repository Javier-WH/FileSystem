const fs = require("fs");


// let files = fs.readdirSync("C:\\wamp64\\www\\CSSTEST");


function getFiles(address) {
    try {

        let fileObject = '{';
        let files = fs.readdirSync(address);
        let showAddress = address.replace(/\\/g, "/");

        for (let i = 0; i < files.length; i++) {
            let type = fs.lstatSync(address + `\\${files[i]}`).isDirectory() ? "folder" : "file";
            fileObject += `"file${i}":{"name": "${files[i]}",`;
            fileObject += `"type" : "${type}",`
            fileObject += `"route": "${showAddress}"}`
            if (i < files.length - 1) {
                fileObject += ", ";
            }

        }

        fileObject += "}";

        // console.log(fileObject);
        // return JSON.parse(fileObject);
        return fileObject;
    } catch (err) {
        return { "Error": "Dirección Invalida" };
    }
}



function makeFolder(url) {
    if (!fs.existsSync(url)) {
        fs.mkdirSync(url);
        console.log(`Carpeta creada en la direccion ${url}`)
        return "Carpeta creada correctamente";
    }
    return "Una Carpeta con ese nombre ya existe";
}


module.exports = { getFiles, makeFolder };