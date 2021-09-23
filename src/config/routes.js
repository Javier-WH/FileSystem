const express = require("express");
const path = require("path");
const files = require(path.join(__dirname, "files.js"));

const router = express.Router();


// const baseAddress = "D:\\FileSystem\\fileContainer";
const baseAddress = "D:\\Respaldo Milagros";
// const baseAddress = "D:\\Jdownloader";

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
})

router.get("/getAddress", (req, res) => {
    if (req.query.address) {
        res.send(files.getFiles(baseAddress + `\\${req.query.address}`));
    } else {
        res.send(files.getFiles(baseAddress));
    }
})

router.get("/getFile", (req, res) => {
    if (req.query.file) {
        file = `${req.query.file}`;

        if (file[0] != "/") {
            file = "\\" + file;
        }

        fileAddress = baseAddress + file;
        fileAddress = fileAddress.replace(/\//g, "\\")
        console.log(`descargado ${fileAddress}`);
        res.download(fileAddress);

    }
})

router.post("/mkdir", (req, res) => {

    let address = req.body.address;
    let name = req.body.name;
    let folderAddress = '';

    if (address == "") {
        folderAddress = baseAddress + "\\" + name;
    } else {
        address = address.replace(/\//g, "\\");
        folderAddress = baseAddress + address + "\\" + name;
    }

    let response = files.makeFolder(folderAddress);


    res.send(response);

})

module.exports = router;