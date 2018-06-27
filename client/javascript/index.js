const electron = require("electron");
const {
    ipcRenderer
} = electron;
const wallpaper = require("wallpaper");
const fs = require('fs');
const axios = require('axios');
const Path = require('path');
const os = require('os');
let maximized = false;
const last = document.querySelector('#last-div');
const next = document.querySelector('#next-div');
const currentImg = document.querySelector('#current-img');

// Settings

const saveButton = document.querySelector('#save');
const wpButton = document.querySelector('#wallpaper');
const path = createPath();


currentImg.addEventListener('dblclick', () => {


    if (!maximized) {
        maximized = true;
        ipcRenderer.send("event:maximize");
    } else {
        maximized = false;
        ipcRenderer.send('event:unmaximize');
    }
})

last.addEventListener('click', () => {


    ipcRenderer.send('last-image');


});

next.addEventListener('click', () => {

    ipcRenderer.send('next-image');

});


ipcRenderer.on('set:next-image', (event, img, images) => {

    draw(img);
});

ipcRenderer.on('set:last-image', (event, img) => {
    draw(img);
});

ipcRenderer.on("event:init", (event, img) => {

    draw(img);

});

ipcRenderer.on('load-ready', (event) => {

    ipcRenderer.send('load-ready');
})

function draw(img) {

    currentImg.src = img.url;

}

wpButton.addEventListener('click', () => {
    setAsWallpaper();
})

saveButton.addEventListener('click', () => {
    save();
})

async function setAsWallpaper() {

    await save();


    wallpaper.set(path).then(() => {

    });


}



async function save() {


    const url = currentImg.src;
    console.log(url)
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve();
        });

        response.data.on('reject', () => {
            reject();
        })
    });


}

function createPath() {

    return Path.resolve(os.homedir(), 'Wpfinder_images', "1.jpg");
}