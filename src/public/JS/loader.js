const fileContainer = document.getElementById("fileContainer");
const btnRegresar = document.getElementById("btn-regresar");
const displayedAddress = document.getElementById("displayed-address");
const message = document.getElementById("message-box");
const btnMakeFolder = document.getElementById("make-folder");
const btnCreateFolder = document.getElementById("btn-create-folder");
const newFolderWindow = document.getElementById("new-folder-window");
const folderBox = document.getElementById("input-folder-name");
const deleteWindow = document.getElementById("delete-file-window");
let object;
let address = '';
let guide = [];


//FUNCION PARA NAVEGAR POR EL SISTEMA DE DIRECTORIOS
async function getAdress(url) {

    let response = null;
    if (!url) {
        response = await fetch("/getAddress");
        displayedAddress.innerText = "/raiz";
    } else {
        response = await fetch(`/getAddress?address=${url}`);
        displayedAddress.innerText = "/raiz" + url.toLowerCase();
    }

    object = await response.json();
    const quantity = Object.keys(object).length;
    let content = "";

    for (let i = 0; i < quantity; i++) {
        let icon = object[`file${i}`].type == "folder" ? "IMG/folder.png" : "IMG/file.png";
        let name = object[`file${i}`].name;
        ///////
        if (object[`file${i}`].name.includes(".docx") || object[`file${i}`].name.includes(".doc")) {
            icon = "IMG/iconWord.png"
        }
        if (object[`file${i}`].name.includes(".ppt") || object[`file${i}`].name.includes(".pptx") || object[`file${i}`].name.includes(".ppsx") || object[`file${i}`].name.includes(".pps")) {
            icon = "IMG/iconPowerPoint.png"
        }
        if (object[`file${i}`].name.includes(".xls") || object[`file${i}`].name.includes(".xlsx")) {
            icon = "IMG/iconExcel.png"
        }
        if (object[`file${i}`].name.includes(".bmp")) {
            icon = "IMG/iconBMP.png"
        }
        if (object[`file${i}`].name.includes(".jpg")) {
            icon = "IMG/iconJPG.png"
        }
        if (object[`file${i}`].name.includes(".png")) {
            icon = "IMG/iconPNG.png"
        }
        if (object[`file${i}`].name.includes(".gif")) {
            icon = "IMG/iconGIF.png"
        }
        if (object[`file${i}`].name.includes(".rar")) {
            icon = "IMG/iconRAR.png"
        }
        if (object[`file${i}`].name.includes(".zip")) {
            icon = "IMG/iconZIP.png"
        }
        if (object[`file${i}`].name.includes(".pdf")) {
            icon = "IMG/iconPDF.png"
        }
        if (object[`file${i}`].name.includes(".mp3")) {
            icon = "IMG/iconMP3.png"
        }
        if (object[`file${i}`].name.includes(".wav")) {
            icon = "IMG/iconWAV.png"
        }
        if (object[`file${i}`].name.includes(".mp4")) {
            icon = "IMG/iconMP4.png"
        }
        if (object[`file${i}`].name.includes(".exe")) {
            icon = "IMG/iconEXE.png"
        }
        if (object[`file${i}`].name.includes(".html")) {
            icon = "IMG/iconHTML.png"
        }

        //////
        content += `<div class="file" id = "file${i}">
            <img src="${icon}" alt="" class="file-icon">
            <label for="file-icon" class ="file-name">${name}</label>
        </div>`;

    }

    fileContainer.innerHTML = content;

}

getAdress();

//////////////////////////
//FUNCION PARA DESCARGAR ARCHIVOS
function downloadFile(url, name) {
    fetch(`/getFile?file=${url}`).then(data => {
        return data.blob();
    }).then(
        response => {
            message.innerText = `Descargando ${url}, por favor espere...`;
            const dataType = response.type;
            const binaryData = [];
            binaryData.push(response);
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
            downloadLink.setAttribute('download', name);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            setTimeout(() => {
                message.innerText = "";
            }, 2000);
        }
    );
}


////////////////////////////////
//FUNCION PARA CREAR DIRECTORIOS
async function makeDir(url) {
    let data = new FormData();
    data.append("address", address);
    data.append("name", url);

    let response = await fetch("/mkdir", {
        method: "POST",
        body: data
    })


}

//EVENTOS
///////////////////////////////////////
//ESTE EVENTO ESTA ATENTO CUANDO SE DA CLICK SOBRE UN ARCHIVO O CARPETA, ABRE LA CARPETA O DESCARGA EL ARCHIVO RESPECTIVAMENTE
fileContainer.addEventListener("click", function(e) {
    let file = e.target.id;
    if (object[file].type == "folder") {
        guide.push(object[file].name);
        address += "/" + object[file].name;
        if (address[0] == "/") {
            address.substring(1);
        }
        getAdress(address);
    } else {
        if (address == "") {
            downloadFile(object[file].name, object[file].name);
        } else {
            if (address[0] == "/") {
                address.substring(1);
            }
            downloadFile(address + "/" + object[file].name, object[file].name);
        }
    }

})


//////////////////////////////////////
//ESTE EVENTO RETROCEDE EN UN NIVEL EL DIRECTORIO EN CUESTION
btnRegresar.addEventListener("click", () => {
    address = address.replace("/" + guide[guide.length - 1], "");
    guide.pop();
    getAdress(address);
})

//////////////////////////
//EVENTO PARA EL BOTON CREAR CARPETA
btnMakeFolder.addEventListener("click", () => {
    newFolderWindow.classList.toggle("invisible");
})
document.getElementById("btn-cancel-folder").addEventListener("click", () => {
    newFolderWindow.classList.toggle("invisible");
})
btnCreateFolder.addEventListener("click", () => {
    makeDir(folderBox.value);
    folderBox.value = "";
    btnCreateFolder.disabled = true;
    getAdress(address);
    newFolderWindow.classList.toggle("invisible");
})
folderBox.addEventListener("keyup", () => {
    if (/^[a-zA-Z0-9\_\-]{1,250}$/.test(folderBox.value)) {
        btnCreateFolder.disabled = false;
    } else {
        btnCreateFolder.disabled = true;
    }
})

fileContainer.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    let file = e.target.id;

    deleteWindow.classList.toggle("invisible");
    // if (object[file].type == "folder") {
    //     guide.push(object[file].name);
    //     address += "/" + object[file].name;
    //     if (address[0] == "/") {
    //         address.substring(1);
    //     }
    //     getAdress(address);
    // } else {
    //     if (address == "") {
    //         downloadFile(object[file].name, object[file].name);
    //     } else {
    //         if (address[0] == "/") {
    //             address.substring(1);
    //         }
    //         downloadFile(address + "/" + object[file].name, object[file].name);
    //     }
    // }

})