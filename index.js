const electron = require("electron");
const Settings = require('./js/settings.js');
const settings = new Settings(__dirname + "/config.json");
const ImageHandler = require("./js/ImageHandler.js");
const ImageLoader = require("./js/ImageLoader.js");
const SettingsMenu = require("./js/SettingsMenu.js");
const Utils = require('./js/Utils.js');
const WindowHandler = require("./js/WindowHandler.js")

const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

const imgLoader = new ImageLoader(settings);
const handler = new ImageHandler(imgLoader, settings);
const utils = new Utils();
const windowhandler = new WindowHandler(handler)

let mainWindow;
let settingsWindow;



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

    if (settings.randomize) {
        handler.shuffle();
    }


    let img = handler.getNextImage();
    mainWindow = windowhandler.getWindow("mainwindow");
    mainWindow.webContents.send("event:init", img);
    mainWindow.show();
});

app.on('ready', () => {
    mainWindow = windowhandler.createMainWindow();    
});

ipcMain.on('event:quit', () => {
    mainWindow = null;
    app.quit();
})

ipcMain.on('event:save', (event, settings) => {

    utils.download(settings);

});

ipcMain.on('event:settingsMenu', (event) => {
    settingsWindow = windowhandler.createSettingsWindow();
});

ipcMain.on('event:exit_without_saving', (event) => {
    const windows = [mainWindow, settingsWindow]
    utils.exit_app(app, windows);
})

ipcMain.on('done', () => {

    if (settings.randomize) {
        handler.shuffle();
    }

})

