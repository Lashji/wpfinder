const electron = require("electron");
const {
    ipcRenderer
} = electron;
const fs = require('fs');
const axios = require('axios');
const Path = require('path');
const os = require('os');
const mkdirp = require('mkdirp')



let maximized = false;
const last = document.querySelector('#last-div');
const next = document.querySelector('#next-div');
const currentImg = document.querySelector('#current-img');

// Settings

const saveButton = document.querySelector('#save');
const wpButton = document.querySelector('#wallpaper');
const exitButton = document.querySelector('#exit');

let folderName = "wpfinder_images";
const homepath = createPath(os.homedir(), folderName);

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

exitButton.addEventListener('click', () => {
    ipcRenderer.send('event:quit');
})

async function setAsWallpaper() {

    await save().then(() => {

        let name = createImageName();
        let slash = process.platform === 'win32' ? '\\' : '/';
        let path = homepath + slash + name;


        ipcRenderer.send("event:setWallpaper", path);

    });


    // console.log(path)
   


}




async function save() {

    if (!pathExist(homepath)) {

        createFolder(homepath);
    }

    let name = createImageName();
    let slash = process.platform === 'win32' ? '\\' : '/';
    const path = homepath + slash + name;

    const settings = {
        url: currentImg.src,
        fileName: name,
        path: path
    }

    ipcRenderer.send('event:save', settings);

}

ipcRenderer.on('event:save', (image) => {

    console.log('download Done');

});




function createPath(dir, folder) {

    return Path.resolve(dir, folder);
}

function pathExist(path) {

    return fs.existsSync(path);


}

async function createFolder(path) {

    await mkdirp(homepath);

}


function createImageName() {
    const url = currentImg.src;
    const index = url.lastIndexOf('/');
    const name = url.substring(index + 1, url.length);

    return name;
}