const fs = require("fs");


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

        return fileObject;
    } catch (err) {
        console.log(address)
        return { "Error": "Dirección Invalida" };
    }
}

function deleteFile(url) {

    try {
        fs.unlinkSync(url);

    } catch (err) {
        console.error(err);
    }
}


function makeFolder(url) {
    if (!fs.existsSync(url)) {
        fs.mkdirSync(url);
        console.log(`Carpeta creada en la direccion ${url}`)
        return "OK";
    }
    return "Una Carpeta con ese nombre ya existe";
}


function deleteFolder(url, callback) {
    fs.rmdir(url, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
        }
        console.log("url: " + url);
        console.log(`Se ha eliminado la carpeta ${url}`);
        callback();
    });

}

function moveFile(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, () => {
        callback();
    })

}


module.exports = { getFiles, makeFolder, deleteFile, deleteFolder, moveFile };