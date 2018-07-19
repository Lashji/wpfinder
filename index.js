const electron = require("electron");
const Settings = require('./js/settings.js');
const settings = new Settings(__dirname + "/config.json");
const ImageHandler = require("./js/ImageHandler.js");
const ImageLoader = require("./js/ImageLoader.js");
const SettingsMenu = require("./js/SettingsMenu.js");
const Utils = require('./js/Utils.js');


const {
    app,
    BrowserWindow,
    ipcMain
} = electron;


const imgLoader = new ImageLoader(settings);
const handler = new ImageHandler(imgLoader, settings);
const utils = new Utils();
let mainWindow;
let settingsWindow;

async function createWindow() {

    mainWindow = new BrowserWindow({
        height: 788,
        width: 1400,
        minHeight: 788,
        minWidth: 1400,
        show: false,
        frame: false,
    });
    // mainWindow.setMenu(null)
    mainWindow.loadURL(`file://${__dirname}/client/main.html`);


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
    console.log(settings.randomize)

    if (settings.randomize) {
        handler.shuffle();
    }

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

    utils.download(settings);

});

ipcMain.on('event:settingsMenu', (event) => {

    menu_conf = {
        height: 300,
        width: 300,
        minHeight: 300,
        minWidth: 480,
        show: true,
        frame: false,
    }

    settingsWindow = new SettingsMenu(menu_conf, settings);
    settingsWindow.loadURL(`file://${__dirname}/client/settings.html`);



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

