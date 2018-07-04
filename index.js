const electron = require("electron");
const ImageHandler = require("./client/javascript/ImageHandler");
const ImageLoader = require("./client/javascript/ImageLoader");

const {
    app,
    BrowserWindow,
    ipcMain
} = electron;
const axios = require('axios');
const fs = require('fs');
const request = require('request');
const wallpaper = require("wallpaper");
const imgLoader = new ImageLoader();
const handler = new ImageHandler(imgLoader);
let mainWindow;


async function createWindow() {

    mainWindow = new BrowserWindow({
        height: 788,
        width: 1400,
        minHeight: 788,
        minWidth: 1400,
        show: false,
        frame: false,
    });

    mainWindow.loadURL(`file://${__dirname}/main.html`);


    mainWindow.once('ready-to-show', () => {

        handler.loadImages(mainWindow);
    })
}


ipcMain.on('next-image', (event) => {
    mainWindow.webContents.send("set:next-image", handler.getNextImage(), handler.getImages());
});

ipcMain.on('last-image', (event) => {
    mainWindow.webContents.send("set:last-image", handler.getLastImage());
});

ipcMain.on('event:maximize', (event) => {
    mainWindow.maximize();
})



ipcMain.on('event:unmaximize', (event) => {
    mainWindow.unmaximize();
});

ipcMain.on('load-ready', () => {
    let img = handler.getNextImage();
    mainWindow.webContents.send("event:init", img);
    mainWindow.show();
});

app.on('ready', createWindow);

ipcMain.on('event:quit', () => {
    mainWindow = null;
    app.quit();
})

ipcMain.on('event:save', (event, settings) => {

    download(settings);

});


async function download(settings) {

    const response = await request.get(settings.url)
        .on('error', (err) => {
            console.log(err)
        })
        .pipe(fs.createWriteStream(settings.path));

        response.on('finish', () => {
            if (settings.setWP){
                setWallpaper(settings.path);
            }
        })

}


function setWallpaper(path) {

    wallpaper.set(path).then(() => {
        console.log("wallpaper set");
    });

}