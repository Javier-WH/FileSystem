const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const publicPath = path.resolve("public");
const getIP = require(path.join(__dirname, "support.js"))
const multer = require("multer");
const form = multer();
const app = express();

const storage = multer.diskStorage({
    destination: "fileContainer",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


app.use(multer({
    storage,
    dest: "fileContainer"
}).single("file"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(form.array());




dotenv.config({ path: path.join(__dirname, "env/.env") });


app.use(require(path.join(__dirname, "./config/routes.js")));

app.use(express.static(path.join(__dirname, "./public")));

app.listen(process.env.PORT, process.env.SERVER_IP, err => {
    console.clear();
    if (err) {
        console.log("Error al iniciar Servidor");
    } else {
        console.log(`Servidor iniciado en la direccion ${getIP.ip} en el puerto ${process.env.PORT}`);
    }
})